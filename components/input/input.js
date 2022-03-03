export class input extends HTMLElement{
    connectedCallback() {
        this.innerHTML = this.getTemplate();
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (!this.props) {
            this.props = {};
        }
        this.props[attrName] = newVal;
    }

    getTemplate() {
        return `
            <style> @import "components/input/styles.css"; </style>
            <div class="form">
                ${this.getInput()}
                <label for="${this.props.myname}" class="form-label">${this.props.mylabel}</label>
            </div>
        `
    }

    static get observedAttributes() {
        return ['mylabel', 'myname', 'isrequired'];
    }

    getInput() {
        return `
            <input   
                name="${this.props.myname}" 
                class="form-control"
                placeholder=" "
                autocomplete="off"
                ${typeof this.props.isrequired !== "undefined" ? 'required' : ''}
            />
        `
    }
}

window.customElements.define("custom-input", input);