import { useEffect, useRef, useState } from "react";
import { CONTACT_LIMITS, validateContact } from "../../../shared/contact.js";
import { sendContact } from "../../lib/contactApi.js";
import { PROJECTS } from "../../content/catalog.js";
import { TextPage } from "./Page.jsx";

const SUCCESS_NOTE = "Xabar yuborildi. Tez orada Telegram orqali javob beraman.";
const HONEYPOT_STYLE = { position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 };

function ContactForm() {
  const formRef = useRef(null);
  const [note, setNote] = useState({ text: "", isError: false });
  const [isSending, setIsSending] = useState(false);

  // page-flip listens natively on its wrapper; stop presses here so typing doesn't turn the page.
  useEffect(() => {
    const form = formRef.current;
    const stop = (e) => e.stopPropagation();
    const events = ["mousedown", "touchstart", "pointerdown"];
    events.forEach((ev) => form.addEventListener(ev, stop));
    return () => events.forEach((ev) => form.removeEventListener(ev, stop));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;
    const form = e.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    const result = validateContact(fields);
    if (!result.ok) {
      setNote({ text: result.error, isError: true });
      return;
    }
    setIsSending(true);
    setNote({ text: "", isError: false });
    const { success, error } = await sendContact({ ...result.data, website: fields.website });
    setIsSending(false);
    if (!success) {
      setNote({ text: error, isError: true });
      return;
    }
    setNote({ text: SUCCESS_NOTE, isError: false });
    form.reset();
  };

  const handleInput = () => {
    if (note.isError) setNote({ text: "", isError: false });
  };

  return (
    <form id="cf" ref={formRef} noValidate onSubmit={handleSubmit} onInput={handleInput}>
      <label>
        Ismingiz
        <input name="name" autoComplete="name" placeholder="Aziza Karimova" maxLength={CONTACT_LIMITS.name} />
      </label>
      <label>
        Telefon yoki Telegram
        <input name="contact" placeholder="+998 90 123 45 67" maxLength={CONTACT_LIMITS.contact} />
      </label>
      <label>
        Qisqacha
        <textarea
          name="msg"
          placeholder="Kofexona uchun logotip va menyu kerak"
          maxLength={CONTACT_LIMITS.msg}
        ></textarea>
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={HONEYPOT_STYLE} />
      <button className="send" type="submit" disabled={isSending}>
        {isSending ? "Yuborilmoqda…" : "Xabar yuborish"}
      </button>
      <p className={note.isError ? "note err" : "note"} id="note" role="status">
        {note.text}
      </p>
    </form>
  );
}

export default function ContactPage({ folio }) {
  const currentFolio = folio ?? (6 + PROJECTS.length * 2);
  return (
    <TextPage section="Bog‘lanish" folio={currentFolio}>
      <h2>Loyihangiz haqida yozing</h2>
      <ContactForm />
      <p className="alt">Bir kun ichida Telegram orqali javob beraman.</p>
    </TextPage>
  );
}
