class table extends CustomHTMLElement {
    getTemplate() {
        return `
        <style> @import "components/table/styles.css"; </style>
        <table class="table">
                ${this.getHeaders()}
            <tbody>
                ${this.getTableBody()}
            </tbody>
        </table>
        `
    }

    static get observedAttributes() {
        return ['myitems'];
    }

    getHeaders() {
        let header = "<thead><tr class='table-header'>"
        const headerNames = [];
        for (const td of Object.keys((store[this.props.myitems] || [])[0] || {})) {
            headerNames.push(td);
        }
        headerNames.push("");
        headerNames.forEach(name => {
            header += `<th scope="scol">${name}</th>`;
        });

        return header + "</tr></thead>";
    }

    getItems() {
        return store[this.props.myitems];
    }

    getItemRow(item) {
        const keys = Object.values(item);
        let row = "";
        keys.forEach(key => {
            row += `<td>${key}</td>`;
        });
        return row;
    }

    getTableActions(item) {
        return `
            <td>
                <custom-button 
                    classes="btn btn-outline-danger"
                    myname="delete"
                    mytext="🗑️"
                    mysize="s"
                    myaction="deleteUser"
                    myactionparam="${item.user}"
                ></custom-button>
            </td>
        `;
    }

    getTableBody() {
        const items = this.getItems();

        if (items.length == 0) {
            return `
                <tr>
                    <td colspan="200" style="text-align: center">
                        There are no games yet.
                    </td>
                </tr>
            `
        }

        return items.map(item => `
            <tr class="table-row">
                ${this.getItemRow(item)}
                ${this.getTableActions(item)}
            </tr>
        `).join("");
    }
}

window.customElements.define("custom-table", table);