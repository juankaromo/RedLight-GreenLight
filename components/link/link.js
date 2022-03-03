export class link extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.getTemplate();
    this.init();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.props) {
      this.props = {};
    }
    this.props[attrName] = newVal;
  }

  getTemplate() {
    return `
            <style> @import "components/link/styles.css"; </style>
            <a             
            href="${this.props.mylink}">
            ${this.props.mytext}
        </a>
        `;
  }

  static get observedAttributes() {
    return ["mytext", "mylink"];
  }

  init() {
    this.addEventListener("click", (evt) => {
      evt.preventDefault();
      router.push(this.props.mylink);
    });
  }
}

window.customElements.define("custom-link", link);
