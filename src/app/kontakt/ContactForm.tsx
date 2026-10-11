"use client";

import { useState } from "react";
import { storeConfig } from "@/config/store";

export function ContactForm() {
  const [notice, setNotice] = useState("");
  const email = storeConfig.business.email;

  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        setNotice(
          email
            ? "Dieses Formular speichert nichts auf dem Server. Nutze die genannte E-Mail-Adresse."
            : "Es wurde keine Nachricht gesendet. Eine Kontakt-E-Mail ist noch nicht hinterlegt.",
        );
      }}
    >
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="email">E-Mail</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="message">Nachricht</label>
        <textarea id="message" name="message" required />
      </div>
      <button className="button button-dark" type="submit">
        Nachricht prüfen
      </button>
      <p role="status">{notice}</p>
    </form>
  );
}
