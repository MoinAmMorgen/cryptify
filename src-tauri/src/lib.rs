// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

// CAESAR
fn create_secret_alphabet(word: &str) -> Vec<char>{
    let mut secret_alphabet: Vec<char> = Vec::new();
    for ch in word.chars() {
        if !secret_alphabet.contains(&ch) {
            secret_alphabet.push(ch);
        }
    }
    let mut start: u32 = 0;
    if let Some(last_char) = word.chars().last() {
        start = last_char as u32;
    }
    for i in 0..26 {
        let mut temp = start + i;
        if temp > 90 {
            temp -= 26;
        };
        if let Some(character) = char::from_u32(temp) {
            if !secret_alphabet.contains(&character) {
                secret_alphabet.push(character);
            }
        }

    }
    return secret_alphabet;
}

#[tauri::command]
fn caesar_encrypt(text: &str, key: &str) -> String {
    let mut encrypted = String::new();
    let secret_alphabet = create_secret_alphabet(key);
    for ch in text.chars() {
        let pos = (ch as u32) - 65; // NOTE: Will crash if special charcacters are included
        if pos > 26 { // Only uppercase letters for now. TODO: Implement all letters and special characters
            return "ERROR ENCRYPTING".to_string()
        }
        encrypted.push(secret_alphabet[pos as usize]);
    }
    return encrypted;
}
// CAESAR;

//COLUMNAR TRANSPOSITION

#[tauri::command]
fn transpos_encrypt(text: &str, key: usize) -> String{
    let mut table: Vec<String> = Vec::new();
    let mut row: Vec<char> = Vec::new();
    for i in (0..text.len()).step_by(key) {
        row.clear();
        for j in 0..key {
            if let Some(ch) = text.chars().nth(i + j) {
                row.push(ch);
            } else {
                row.push('X'); // Padding with 'X'
            }
        }
        table.push(row.iter().collect()); // Convert Vec<char> to String and push to table
    }
    let mut encrypted = String::new();
    for i in 0..key {
        for row in &table {
            if let Some(ch) = row.chars().nth(i) {
                encrypted.push(ch);
            }
        }
    }
    return encrypted

}




#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![caesar_encrypt, transpos_encrypt])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
