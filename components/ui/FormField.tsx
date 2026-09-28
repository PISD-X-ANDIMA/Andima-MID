"use client";

import { useId, useRef, useState } from "react";
import styles from "./FormField.module.css";

const options = [
  { value: "aktif", label: "Aktif" },
  { value: "tidak-aktif", label: "Tidak Aktif" },
];

export default function FormField() {
  const id = useId();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [statusTouched, setStatusTouched] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = options.find((option) => option.value === status);
  const nameError = nameTouched && name.trim() === "";
  const statusError = statusTouched && status === "";

  function closeOptions() {
    setOpen(false);
    trigger.current?.focus();
  }

  return (
    <section className={styles.form} aria-label="Form input">
      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${id}-name`}>Nama</label>
        <input
          className={styles.control}
          id={`${id}-name`}
          name="nama"
          type="text"
          autoComplete="name"
          placeholder="Masukkan nama"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => setNameTouched(true)}
          required
          aria-invalid={nameError}
          aria-describedby={nameError ? `${id}-name-error` : undefined}
        />
        {nameError && <p className={styles.error} id={`${id}-name-error`}>Nama wajib diisi</p>}
      </div>

      <div
        className={styles.field}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpen(false);
            setStatusTouched(true);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            event.preventDefault();
            closeOptions();
          }
        }}
      >
        <label className={styles.label} id={`${id}-status-label`} htmlFor={`${id}-status`}>Status</label>
        <input type="hidden" name="status" value={status} />
        <button
          ref={trigger}
          id={`${id}-status`}
          type="button"
          className={`${styles.control} ${styles.trigger} ${!selected ? styles.placeholder : ""}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? `${id}-options` : undefined}
          data-invalid={statusError}
          aria-describedby={statusError ? `${id}-status-error` : undefined}
          onClick={() => setOpen(!open)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              if (!open) setOpen(true);
              else optionRefs.current[event.key === "ArrowDown" ? 0 : options.length - 1]?.focus();
            }
          }}
        >
          {selected?.label ?? "Pilih status"}
          <svg className={`${styles.chevron} ${open ? styles.expanded : ""}`} width="30" height="22" viewBox="0 0 30 22" fill="none" aria-hidden="true">
            <path d="M3 4L15 18L27 4" stroke="currentColor" strokeWidth="3.5" />
          </svg>
        </button>
        {open && (
          <div className={styles.options} id={`${id}-options`} role="listbox" aria-labelledby={`${id}-status-label`}>
            {options.map((option, index) => (
              <button
                key={option.value}
                ref={(element) => { optionRefs.current[index] = element; }}
                type="button"
                role="option"
                aria-selected={status === option.value}
                autoFocus={index === Math.max(0, options.findIndex((item) => item.value === status))}
                className={styles.option}
                onKeyDown={(event) => {
                  let next = index;
                  if (event.key === "ArrowDown") next = (index + 1) % options.length;
                  else if (event.key === "ArrowUp") next = (index - 1 + options.length) % options.length;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = options.length - 1;
                  else return;
                  event.preventDefault();
                  optionRefs.current[next]?.focus();
                }}
                onClick={() => {
                  setStatus(option.value);
                  setStatusTouched(true);
                  closeOptions();
                }}
              >
                {option.label}
                {status === option.value && <span aria-hidden="true">✓</span>}
              </button>
            ))}
          </div>
        )}
        {statusError && <p className={styles.error} id={`${id}-status-error`}>Status wajib dipilih</p>}
      </div>
    </section>
  );
}
