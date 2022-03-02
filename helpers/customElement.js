class CustomHTMLElement extends HTMLElement {
    connectedCallback() {
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.getTemplate();
        this.appendChild(document.importNode(templateElement.content, true));
        this.init();
        this.render();
    }

    getTemplate() {
        return "";
    }

    init() { }
    render() { }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (!this.props) {
            this.props = {};
        }
        this.props[attrName] = newVal;
    }
}
