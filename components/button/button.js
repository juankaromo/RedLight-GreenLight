export class button extends HTMLElement {
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
            <style> @import "components/button/styles.css"; </style>
            <button name="${this.props.myname}" class="${this.props.mysize}">${this.props.mytext}</button>
        `;
  }

  static get observedAttributes() {
    return [
      "mytext",
      "myname",
      "mysize",
      "issubmit",
      "iscustom",
      "myaction",
      "myactionparam",
    ];
  }

  init() {
    if (!this.props.issubmit && !this.props.iscustom) {
      this.addEventListener("click", (evt) => {
        evt.preventDefault();
        if (this.props.myaction) {
          window[this.props.myaction](this.props["myactionparam"]);
          return;
        }
        router.push(this.props.myname);
      });
    }
  }
}

window.customElements.define("custom-button", button);
