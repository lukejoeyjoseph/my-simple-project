const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const router = async () => {
    const routes = [
        { path: "/", view: Dashboard },
        { path: "/posts", view: Posts },
        { path: "/posts/:id", view: PostView },
        { path: "/settings", view: Settings }
    ];
}
const potentialMatches = routes.map(route => {
    return {
        route,
        result: location.pathname.match(pathToRegex(route.path))
    };
});
let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

/* Route not found - return first route OR a specific "not-found" route */
if (!match) {
    match = {
        route: routes[0],
        result: [location.pathname]
    };
}
console.log(match);

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    /* Document has loaded -  run the router! */
    router();
});

window.addEventListener("popstate", router);

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

{
    "id": "2",
    "anotherParam": "dcode"
}
// frontend/static/js/views/AbstractView.js
export default class {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return "";
    }
}
// frontend/static/js/views/Dashboard.js
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
            <h1>Welcome back, Dom</h1>
            <p>Hi there, this is your Dashboard.</p>
            <p>
                <a href="/posts" data-link>View recent posts</a>.
            </p>
        `;
    }
}

import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";

const view = new match.route.view(getParams(match));
document.querySelector("#app").innerHTML = await view.getHtml();
