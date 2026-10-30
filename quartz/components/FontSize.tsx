import type { QuartzComponent } from "./types"

const FontSize: QuartzComponent = () => (
  <div class="font-size-picker" role="group" aria-label="全站字号">
    <span>字号</span>
    <button type="button" data-font-size="small" aria-pressed="false">小</button>
    <button type="button" data-font-size="standard" aria-pressed="true">标准</button>
    <button type="button" data-font-size="large" aria-pressed="false">大</button>
  </div>
)
FontSize.beforeDOMLoaded = `
(() => {
  try {
    const size = localStorage.getItem("surosy-font-size");
    if (["small", "standard", "large"].includes(size)) document.documentElement.dataset.fontSize = size;
  } catch {}
})();
`
FontSize.afterDOMLoaded = `
(() => {
  function apply(size) {
    document.documentElement.dataset.fontSize = size;
    document.querySelectorAll("[data-font-size]").forEach(button => {
      if (button.tagName === "BUTTON") button.setAttribute("aria-pressed", String(button.dataset.fontSize === size));
    });
  }
  function initialize() {
    let size = document.documentElement.dataset.fontSize || "standard";
    try { size = localStorage.getItem("surosy-font-size") || size; } catch {}
    apply(["small", "standard", "large"].includes(size) ? size : "standard");
  }
  document.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest("button[data-font-size]");
    if (!button) return;
    const size = button.dataset.fontSize;
    if (!["small", "standard", "large"].includes(size)) return;
    apply(size);
    try { localStorage.setItem("surosy-font-size", size); } catch {}
  });
  document.addEventListener("nav", initialize);
  initialize();
})();
`
export default FontSize
