import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";

function setLoaderPercent(value) {
  const pct = Math.min(100, Math.max(0, Math.round(value)));
  const loader = document.getElementById("initial-loader");
  const span = document.getElementById("initial-loader-percent");
  if (span) span.textContent = `${pct}%`;
  if (loader) {
    loader.setAttribute("aria-valuenow", String(pct));
    loader.setAttribute("aria-valuetext", `Loading ${pct}%`);
  }
}

function dismissInitialLoader() {
  const el = document.getElementById("initial-loader");
  if (!el || el.dataset.dismissed === "1") return;
  el.dataset.dismissed = "1";
  el.removeAttribute("aria-busy");
  el.removeAttribute("role");
  el.removeAttribute("aria-valuemin");
  el.removeAttribute("aria-valuemax");
  el.removeAttribute("aria-valuenow");
  el.removeAttribute("aria-valuetext");
  el.classList.add("initial-loader--hidden");
  const remove = () => {
    el.remove();
  };
  el.addEventListener("transitionend", remove, { once: true });
  window.setTimeout(remove, 600);
}

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

const loadStart = performance.now();
let loadFinished = false;
let displayed = 0;
let rafId = 0;

function progressTick() {
  if (loadFinished) return;
  const t = performance.now() - loadStart;
  const asymptotic = 94 * (1 - Math.exp(-t / 2200));
  displayed = Math.min(94, Math.max(displayed, asymptotic));
  setLoaderPercent(displayed);
  rafId = requestAnimationFrame(progressTick);
}

function finishProgressThenDismiss() {
  loadFinished = true;
  cancelAnimationFrame(rafId);
  setLoaderPercent(100);
  window.setTimeout(() => {
    requestAnimationFrame(() => dismissInitialLoader());
  }, 280);
}

setLoaderPercent(0);
rafId = requestAnimationFrame(progressTick);

if (document.readyState === "complete") {
  finishProgressThenDismiss();
} else {
  window.addEventListener("load", finishProgressThenDismiss, { once: true });
}
