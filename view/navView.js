import { NAV_SECTION_MAP } from "../viewmodel/navViewModel.js";

/**
 * Handles all DOM operations for the navigation bar and section visibility.
 */
export class NavView {
  constructor() {
    this._navBar   = document.querySelector("nav");
    this._sections = Object.values(NAV_SECTION_MAP).map((sel) =>
      document.querySelector(sel)
    );
  }

  /**
   * Shows only the section that corresponds to activeTab; hides the rest.
   * @param {string} activeTab  e.g. "About"
   */
  showSection(activeTab) {
    const activeSelector = NAV_SECTION_MAP[activeTab];
    for (const [label, selector] of Object.entries(NAV_SECTION_MAP)) {
      const el = document.querySelector(selector);
      if (el) el.hidden = selector !== activeSelector;
    }

    for (const span of this._navBar.querySelectorAll("span")) {
      span.setAttribute("data-active", span.textContent.trim() === activeTab);
    }
  }

  /**
   * Registers a handler for tab clicks.
   * @param {Function} cb  Receives the clicked tab label string.
   */
  onTabClick(cb) {
    this._navBar.addEventListener("click", (event) => {
      const span = event.target.closest("span");
      if (span) cb(span.textContent.trim());
    });
  }
}