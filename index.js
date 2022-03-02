import { RouterHandler } from "./router/router-handler";

class App {
    constructor() {
        const router = new RouterHandler();
        router.init();
    }
}

new App();