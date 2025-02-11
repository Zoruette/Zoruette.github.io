/* SwitchJS v1.3 by Zerthox */
!function() {
    // Inject CSS
    var style = document.createElement("style");
    style.id = "switchjs-style";
    style.innerHTML = `
    [switch-root] {
        position: relative;
    }
    [switch-page] {
        position: absolute;
        opacity: 0;
        -webkit-transition: opacity .3s ease-in-out;
        -moz-transition: opacity .3s ease-in-out;
        -ms-transition: opacity .3s ease-in-out;
        -o-transition: opacity .3s ease-in-out;
        transition: opacity .3s ease-in-out;
    }
    [switch-page][switch-visible] {
        opacity: 1;
    }
    [switch-page]:not([switch-visible]) {
        pointer-events: none;
    }
    [switch-ref] {
        cursor: pointer;
    }`;
    document.head.appendChild(style);
    // Declare SwitchJS object
    window.switchjs = {
        init: function() {
            var r = document.querySelector("[switch-root]");
            if (r) {
                // Declare root
                switchjs.root = r;
                // Declare pages
                switchjs.pages = switchjs.root.querySelectorAll("[switch-page]");
                // Initialize refs
                switchjs.refs = document.querySelectorAll("[switch-ref]");
                for (var i = 0; i < switchjs.refs.length; i++) {
                    switchjs.refs[i].onclick = function() {
                        switchjs.show(this.getAttribute("switch-ref"));
                    };
                }
                // Show default page
                var d = switchjs.root.querySelector("[switch-page]").getAttribute("switch-page");
                let h = window.location.hash.slice(1),
                    a = switchjs.root.getAttribute("switch-root");
                if (h.length > 0 && switchjs.root.querySelector("[switch-page=" + h + "]")) {
                    d = h;
                }
                else if (a.length > 0 && switchjs.root.querySelector("[switch-page=" + a + "]")) {
                    d = a;
                }
                switchjs.show(d, 0);
            }
        },
        show: function(page, timeout = 300) {
            // Hide pages
            for (var i = 0; i < switchjs.pages.length; i++) {
                if (switchjs.pages[i].hasAttribute("switch-visible") || switchjs.pages[i].hasAttribute("switch-in")) {
                    switchjs.pages[i].setAttribute("switch-out", "");
                    switchjs.pages[i].removeAttribute("switch-visible");
                    switchjs.pages[i].removeAttribute("switch-in");
                }
                if (switchjs.pages[i].getAttribute("switch-page") === page) {
                    switchjs.pages[i].setAttribute("switch-in", "");
                    window.location.hash = "#" + page;
                }
            }
            // Update refs
            for (var i = 0; i < switchjs.refs.length; i++) {
                if (switchjs.refs[i].getAttribute("switch-ref") === page) {
                    switchjs.refs[i].setAttribute("switch-selected", "");
                }
                else {
                    switchjs.refs[i].removeAttribute("switch-selected");
                }
            }
            // Unhide active page
            setTimeout(function() {
                for (var i = 0; i < switchjs.pages.length; i++) {
                    switchjs.pages[i].removeAttribute("switch-out");
                    if (switchjs.pages[i].hasAttribute("switch-in")) {
                        switchjs.pages[i].setAttribute("switch-visible", "");
                        switchjs.pages[i].removeAttribute("switch-in");
                    }
                }
            }, timeout);
        }
    }
    // Register onload
    window.addEventListener("load", switchjs.init);
}();