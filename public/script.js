function loadPage(href, push = true) {
    fetch(href)
        .then(res => res.text())
        .then(html => {
            document.getElementById("root").innerHTML = html;

            if (push) {
                window.history.pushState({}, '', href);
            }

            bindLinks(); // re-bind links
        })
        .catch(err => {
            document.getElementById("root").innerHTML = err.toString();
        });
}

function bindLinks() {
    document.querySelectorAll(".Link").forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            loadPage(e.currentTarget.href, true);
        };
    });
}

// Back / Forward
window.addEventListener('popstate', () => {
    loadPage(window.location.pathname, false);
});

document.addEventListener("DOMContentLoaded", () => {
    bindLinks();
});
