import { useEffect, useRef, useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Can I add my own products for customization?",
    answer:
      "Yes, you can add your own shank styles, head styles, matching bands, metal types, and more.",
  },
  {
    question: "Can I adjust the pricing for each item?",
    answer: "Yes, you can set custom pricing for each item individually.",
  },
  {
    question: "What are the model requirements?",
    answer:
      "To add your own products, you'll need to share 3D models in .glb format.",
  },
  {
    question: "Is there Add-to-Cart and shareable functionality?",
    answer:
      "Yes, customers can add items to cart and share a unique URL of their customized jewelry with you.",
  },
  {
    question: "Can I change the language, and currency here?",
    answer:
      "Yes, we have Language and region support which let you change these easily.",
  },
];

function ChevronIcon({ open }) {
  return (
    <svg
      className={`faq-dropdown__chevron ${open ? "faq-dropdown__chevron--open" : ""}`}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FaqDropdown() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div className="faq-dropdown" ref={rootRef}>
      <button
        type="button"
        className="faq-dropdown__trigger"
        aria-expanded={open}
        aria-controls="faq-dropdown-panel"
        id="faq-dropdown-trigger"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="faq-dropdown__trigger-inner">
          <span className="faq-dropdown__trigger-label">FAQs</span>
          <ChevronIcon open={open} />
        </span>
      </button>

      {open ? (
        <div
          className="faq-dropdown__panel"
          id="faq-dropdown-panel"
          role="region"
          aria-labelledby="faq-dropdown-trigger"
        >
          <ul className="faq-dropdown__list">
            {FAQ_ITEMS.map((item, i) => (
              <li key={i} className="faq-dropdown__item">
                <p className="faq-dropdown__question">{item.question}</p>
                <p className="faq-dropdown__answer">{item.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
