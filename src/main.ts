import { invoke } from "@tauri-apps/api/core";

window.addEventListener("DOMContentLoaded", () => {
  const buttons: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll("#buttons button");
  const inputTextarea: HTMLTextAreaElement | null =
    document.querySelector("#input");
  let output = document.querySelector("#output") as HTMLTextAreaElement;

  async function caesar_encrypt() {
    if (output) {
      output.value = await invoke("caesar_encrypt", {
        text: inputTextarea?.value,
        key: "PLACEHOLDER", // TODO: Create user input for custom key or generate a custom one
      });
    }
  }
  async function transpos_encrypt() {
    if (output) {
      output.value = await invoke("transpos_encrypt", {
        text: inputTextarea?.value,
        key: 4, // TODO: Create user input for custom key or generate a custom one
      });
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      switch (button.id) {
        case "caesar_encrypt":
          caesar_encrypt();
          break;
        case "transpos_encrypt":
          transpos_encrypt();
          break;
      }
    });
  });
  inputTextarea?.addEventListener("input", () => {
    buttons.forEach((button) => {
      if (button.classList.contains("active")) {
        switch (button.id) {
          case "caesar_encrypt":
            caesar_encrypt();
            break;
          case "transpos_encrypt":
            transpos_encrypt();
            break;
        }
      }
    });
  });
});
