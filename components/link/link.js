class link extends CustomHTMLElement {
    getTemplate() {
        return `
            <style> @import "components/link/styles.css"; </style>
            <a             
            href="${this.props.mylink}">
            ${this.props.mytext}
        </a>
        `
    }

    static get observedAttributes() {
        return ['mytext', 'mylink'];
    }

    init() {
        this.addEventListener('click', evt => {
            evt.preventDefault();
            router.push(this.props.mylink);
        })
    }
}

window.customElements.define("custom-link", link);