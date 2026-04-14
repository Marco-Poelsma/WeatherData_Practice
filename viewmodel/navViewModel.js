/**
 * Maps nav tab labels to their corresponding section selectors.
 */
export const NAV_SECTION_MAP = {
  About:    "#destination-resume",
  Weather:  "#weather",
  Currency: "#currency-converter",
};

/**
 * Manages which tab is active and which section is visible.
 */
export class NavViewModel {
  constructor() {
    /** @type {string} */
    this.activeTab = "About";
    /** @type {Function[]} */
    this._onTabChangeCallbacks = [];
  }

  /**
   * Switches the active tab and notifies subscribers.
   * @param {string} tabLabel
   */
  selectTab(tabLabel) {
    if (!NAV_SECTION_MAP[tabLabel]) return;
    this.activeTab = tabLabel;
    this._onTabChangeCallbacks.forEach((cb) => cb(tabLabel));
  }

  /**
   * @param {Function} cb  Receives the new active tab label.
   */
  onTabChange(cb) {
    this._onTabChangeCallbacks.push(cb);
  }
}