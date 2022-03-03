class Router extends HTMLElement {
    constructor() {
        super();
        this.PATHS = {
            home: {
                path: "home",
                template: `<login-app></login-app>`,
            },
            game: {
                path: "game",
                params: true,
                template: "<game-app></game-app>",
            },
            ranking: {
                path: "ranking",
                template: "<ranking-app></ranking-app>",
            }
        }
    }

    connectedCallback() {
        this.innerHTML = this.getTemplate();
    }

    getTemplate() {
        var url = new URL(window.location.href.replace('#', ''));
        const urlParams = url.search || "";
        const currentPage = !urlParams ? store.currentPage : store.currentPage.split(urlParams)[0];
        
        if (!currentPage || !this.PATHS[currentPage]) {
            router.push(this.PATHS['home']['path']);
            return `${this.PATHS['home']['template']}`;
        }

        return `${this.PATHS[currentPage]['template']}`;
    }
}

window.onhashchange = (evt) => {
    const newUrl = evt.newURL.split("#");

    if (newUrl.length > 1) {
        setPage(newUrl[1]);
    } else {
        setPage("home");
    }

    router.refresh();
}

const router = {
    push(name, params) {
        var pageUrl = `#${name}`;
        pageUrl += params ? '?' + params : '';
        window.history.pushState('', '', pageUrl);
        setPage(name);
        this.refresh();
    },
    refresh() {
        const newRouterElement = document.createElement("app-router");
        newRouterElement.id = "router";

        document.querySelector("#router").remove();
        document.querySelector("#content").appendChild(newRouterElement);
    },
}

function setPage(name) {
    const pathArray = name.split("/");
    store.currentPage = pathArray[0];
    store.currentPath = pathArray;
}

setPage(window.location.hash.replace("#", ""));

window.customElements.define('app-router', Router);