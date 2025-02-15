import { invoke } from "@tauri-apps/api/core";

window.addEventListener("DOMContentLoaded", () => {
  const buttons: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll("#buttons button");
  const inputForm: HTMLFormElement | null =
    document.querySelector("#input-form");
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

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  if (inputTextarea) {
    inputTextarea.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (inputForm) {
          inputForm.requestSubmit();
          caesar_encrypt();
        }
      }
    });
  }

  if (inputForm) {
    inputForm.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      if (inputTextarea) {
        // Form submitted TODO: Add encrypion logic
        // For Caesar only without possibility to switch:
        caesar_encrypt();
      }
    });
  }
});
