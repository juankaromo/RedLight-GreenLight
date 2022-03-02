class ranking extends CustomHTMLElement {
    getTemplate() {
        return `
        <style> @import "components/ranking/styles.css"; </style>
        <div class="ranking-content">
            <h1><custom-link mytext="‹" mylink="home"></custom-link>Ranking</h1>
            <custom-table myitems="games"></custom-table>
        </div>
        `;
    }

    init() {

    }
}

window.customElements.define("ranking-app", ranking);