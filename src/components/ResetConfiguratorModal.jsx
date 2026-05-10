import { useEffect, useRef } from "react";

function ResetIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

export { ResetIcon };

export default function ResetConfiguratorModal({
  open,
  onClose,
  onConfirm,
}) {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="reset-modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="reset-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-modal-title"
      >
        <button
          type="button"
          className="reset-modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          <span aria-hidden>×</span>
        </button>
        <h2 id="reset-modal-title" className="reset-modal__title">
          Are you sure you want to reset?
        </h2>
        <button
          ref={confirmRef}
          type="button"
          className="reset-modal__confirm"
          onClick={onConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
