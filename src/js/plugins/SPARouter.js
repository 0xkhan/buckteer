class SPARouter {

    /** List of routes */
    #routes = {};

    constructor() {
        window.onpopstate = this.locationHandler.bind(this);
        window.route = this.route;
    }

    setRoutes(routes) {
        Object.assign(this.#routes, routes);
        this.locationHandler();

        return this;
    }

    initRouter({ selector }) {
        if (this.#isRouteTypeHash(this.#routes)) {
            document.addEventListener('hashChange', this.locationHandler);
        } else {
            document.addEventListener('click', (event) => {
                event.preventDefault();
                if (!event.target.matches(selector)) return;
                this.route();
            });
        }
    }

    route(event) {
        event = event || window.event;
        event.preventDefault();

        if (!this.#isValidPath(event.target.href)) {
            window.open(event.target.href);
            return;
        }

        window.history.pushState({}, "", event.target.href);
        this.locationHandler();
    }

    async locationHandler() {
        let location;

        if (this.#isRouteTypeHash(this.#routes)) {
            // If routes are based on hash
            location = window.location.hash;
        } else {
            // If routes are based on pathnames
            location = window.location.pathname;
        }

        if (location.length == 0) location = '/';

        const route = this.#routes[location] || this.#routes[404];
        const html = await fetch(route.template)
            .then(response => response.text());

        document.querySelector('.main-content__container').innerHTML = html;
        document.title = route.title;
        document.querySelector('meta[name="description"]')
            .setAttribute("content", route.description);
    }

    #isValidPath(path) {
        return path.includes(window.location.origin);
    }

    #isRouteTypeHash(routes) {
        const allPaths = Object.keys(routes);
        const actualPaths = [];

        allPaths.forEach((path) => {
            if (path !== '404' && path !== '/') {
                actualPaths.push(path);
            }
        })

        return actualPaths[0].startsWith('#');
    }

}

export default new SPARouter();
