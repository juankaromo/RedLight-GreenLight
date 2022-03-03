export class mainApp extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style> @import "components/main/styles.css"; </style>
        <div id="content">
            <app-router id="router"></app-router>
        </div>`;
  }
}

window.customElements.define("main-app", mainApp);
