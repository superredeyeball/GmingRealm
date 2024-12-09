console.log("cloak.js loaded.")

/////////////////////////////////////////// Line numbering stuff ////////////////////////////////////////////////////

const TLN = { eventList: {}, update_line_numbers: function (e, t) { let n = e.value.split("\n").length - t.children.length; if (n > 0) { const e = document.createDocumentFragment(); for (; n > 0;) { const t = document.createElement("span"); t.className = "tln-line", e.appendChild(t), n-- } t.appendChild(e) } for (; n < 0;)t.removeChild(t.lastChild), n++ }, append_line_numbers: function (e) { const t = document.getElementById(e); if (null == t) return console.warn("[tln.js] Couldn't find textarea of id '" + e + "'"); if (-1 != t.className.indexOf("tln-active")) return console.warn("[tln.js] textarea of id '" + e + "' is already numbered"); t.classList.add("tln-active"), t.style = {}; const n = document.createElement("div"); n.className = "tln-wrapper", t.parentNode.insertBefore(n, t), TLN.update_line_numbers(t, n), TLN.eventList[e] = []; const l = ["propertychange", "input", "keydown", "keyup"], o = function (e, t) { return function (n) { (10 != +e.scrollLeft || 37 != n.keyCode && 37 != n.which && "ArrowLeft" != n.code && "ArrowLeft" != n.key) && 36 != n.keyCode && 36 != n.which && "Home" != n.code && "Home" != n.key && 13 != n.keyCode && 13 != n.which && "Enter" != n.code && "Enter" != n.key && "NumpadEnter" != n.code || (e.scrollLeft = 0), TLN.update_line_numbers(e, t) } }(t, n); for (let n = l.length - 1; n >= 0; n--)t.addEventListener(l[n], o), TLN.eventList[e].push({ evt: l[n], hdlr: o }); const r = ["change", "mousewheel", "scroll"], s = function (e, t) { return function () { t.scrollTop = e.scrollTop } }(t, n); for (let n = r.length - 1; n >= 0; n--)t.addEventListener(r[n], s), TLN.eventList[e].push({ evt: r[n], hdlr: s }) }, remove_line_numbers: function (e) { const t = document.getElementById(e); if (null == t) return console.warn("[tln.js] Couldn't find textarea of id '" + e + "'"); if (-1 == t.className.indexOf("tln-active")) return console.warn("[tln.js] textarea of id '" + e + "' isn't numbered"); t.classList.remove("tln-active"); const n = t.previousSibling; if ("tln-wrapper" == n.className && n.remove(), TLN.eventList[e]) { for (let n = TLN.eventList[e].length - 1; n >= 0; n--) { const l = TLN.eventList[e][n]; t.removeEventListener(l.evt, l.hdlr) } delete TLN.eventList[e] } } };

// Create a new style element
var style = document.createElement('style');

// Add your minified CSS code as the text content of the style element
style.textContent = `
.tln-active,.tln-wrapper,.tln-line{margin:0;border:0;padding:0;outline:0;box-sizing:border-box;vertical-align:middle;list-style:none}.tln-active{display:inline-block;padding:.625em;width:calc(100% - 3em);height:100%;word-break:break-all;border:1px solid #aeaeae;background-color:#fff;resize:none;overflow-wrap:normal;overflow-x:auto;white-space:pre;font:1em/1.5 "Roboto Mono",monospace}.tln-wrapper{width:3em;padding:.6875em .3125em 2.1875em;height:100%;word-break:break-all;overflow:hidden;display:inline-block;counter-reset:line}.tln-line{width:100%;display:block;text-align:right;line-height:1.5;font-size:1em;color:#aeaeae;font-variant-numeric:tabular-nums}.tln-line::before{counter-increment:line;content:counter(line);font-size:1em;user-select:none}
`;

// Append the style element to the head of the document
document.head.appendChild(style);

///////////////////////////////////////// End line numbering stuff //////////////////////////////////////////////////

function setCookie(name, value, options) {
    options = options || {};

    let expires = options.expires;

    if (typeof expires == "number" && expires) {
        const d = new Date();
        d.setTime(d.getTime() + expires * 24 * 60 * 60 * 1000);
        expires = options.expires = d;
    }

    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + "=" + value;

    for (const propName in options) {
        updatedCookie += "; " + propName;
        const propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

document.addEventListener("DOMContentLoaded", function () {
    // Attempt to set the favicon and title with multiple strategies.
    trySettingTabAttributes();
});

function trySettingTabAttributes() {
    const presetKey = getCookie("tabCloakPreset");

    // Define the presets here
    const presets = {
        google: {
            favicon: "/images/icons/google.ico",
            title: "Google"
        },
        nothing: {
            favicon: "/images/icons/nothing.ico",
            title: "​"
        },
        bing: {
            favicon: "/images/icons/bing.ico",
            title: "Bing"
        },
        gmail: {
            favicon: "/images/icons/gmail.ico",
            title: "Gmail"
        },
        desmos: {
            favicon: "/images/icons/desmos.ico",
            title: "Desmos | Graphing Calculator"
        },
        googleclassroom: {
            favicon: "/images/icons/googleclassroom.ico",
            title: "Home"
        },
        wikipedia: {
            favicon: "/images/icons/wikipedia.ico",
            title: "Wikipedia"
        },
        chrometab: {
            favicon: "/images/icons/chromenewtab.ico",
            title: "New Tab"
        },
        googledrive: {
            favicon: "/images/icons/googledrive.ico",
            title: "My Drive"
        }
    };


    // Check if the preset is valid
    if (presetKey && presets[presetKey]) {
        const preset = presets[presetKey];

        // Set title
        trySetTitle(preset.title);

        // Set favicon
        trySetFavicon(preset.favicon);
    }
}

function trySetTitle(title) {
    if (document.title !== title) {
        document.title = title;
    }
    // Fallback strategies if needed
}

function trySetFavicon(faviconURL) {
    // Cache-buster to prevent caching issues
    const faviconWithCacheBuster = faviconURL + '?v=' + new Date().getTime();

    let attempts = 0;
    const maxAttempts = 5;  // Reduced max attempts

    const checkFaviconLoaded = (favicon) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = favicon.href;
        });
    };

    const setFavicon = () => {
        const newFavicon = document.createElement("link");
        newFavicon.rel = "shortcut icon";
        newFavicon.type = "image/x-icon";
        newFavicon.href = faviconWithCacheBuster;

        const existingFavicon = document.querySelector("link[rel*='icon']");
        if (existingFavicon) {
            document.head.removeChild(existingFavicon);
        }
        document.head.appendChild(newFavicon);

        // Check if the favicon is properly loaded
        checkFaviconLoaded(newFavicon).then((isLoaded) => {
            if (isLoaded) {
                console.log("Favicon successfully loaded.");
            } else {
                console.error("Favicon failed to load, retrying...");
                if (attempts < maxAttempts) {
                    attempts++;
                    setTimeout(setFavicon, 1000);  // Retry after 1 second
                } else {
                    console.error("Max attempts reached. Favicon could not be set.");
                }
            }
        });
    };

    // Initial favicon setting
    setFavicon();
}

/*

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        updateFavicon();
    }, 100); // Adjust this delay if needed
});

function updateFavicon() {
    const selectedPreset = getCookie("tabCloakPreset");

    console.log("Selected Preset:", selectedPreset);

    const presets = {
        google: {
            favicon: "/images/icons/google.ico",
            title: "Google"
        },
        nothing: {
            favicon: "/images/icons/nothing.ico",
            title: "​"
        },
        bing: {
            favicon: "/images/icons/bing.ico",
            title: "Bing"
        },
        gmail: {
            favicon: "/images/icons/gmail.ico",
            title: "Gmail"
        },
        desmos: {
            favicon: "/images/icons/desmos.ico",
            title: "Desmos | Graphing Calculator"
        },
        googleclassroom: {
            favicon: "/images/icons/googleclassroom.ico",
            title: "Home"
        },
        wikipedia: {
            favicon: "/images/icons/wikipedia.ico",
            title: "Wikipedia"
        },
        chrometab: {
            favicon: "/images/icons/chromenewtab.ico",
            title: "New Tab"
        },
        googledrive: {
            favicon: "/images/icons/googledrive.ico",
            title: "My Drive"
        }
    };

    if (selectedPreset && presets[selectedPreset]) {
        const preset = presets[selectedPreset];
        document.title = preset.title;

        const newFavicon = document.createElement("link");
        newFavicon.rel = "icon";
        newFavicon.href = preset.favicon + '?v=' + new Date().getTime();  // Adds a timestamp to prevent caching

        const existingFavicon = document.querySelector("link[rel='icon']");
        if (existingFavicon) {
            document.head.removeChild(existingFavicon);
        }

        document.head.appendChild(newFavicon);
    }
}

*/

(function() {
    const panicKey = localStorage.getItem('panicKey');
    const panicUrl = localStorage.getItem('panicUrl') || 'https://www.desmos.com/scientific';

    if (!panicKey) {
        return;
    }

    const keys = new Set(panicKey.split('+'));
    const pressedKeys = new Set();

    function keyHandler(event) {
        pressedKeys.add(event.key);

        for (let key of keys) {
            if (!pressedKeys.has(key)) {
                return;
            }
        }

        document.body.innerHTML = '';
        window.location.href = panicUrl;
    }

    function keyUpHandler(event) {
        pressedKeys.delete(event.key);
    }

    document.addEventListener('keydown', keyHandler);
    document.addEventListener('keyup', keyUpHandler);
})();

(function () {
    const codeKey = localStorage.getItem('codeKey');

    if (!codeKey) {
        return;
    }

    const codeKeys = new Set(codeKey.split('+'));
    const codePressedKeys = new Set();
    let popup = null;
    let closeAndExec = false;

    function createPopup() {
        popup = document.createElement('div');
        popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #2b2b2b;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
        z-index: 10000;
        font-family: 'Courier New', monospace;
        color: #f8f8f2;
        width: 600px;
    `;

        const title = document.createElement('div');
        title.textContent = 'Enter JavaScript Code:';
        title.style.cssText = `
        font-size: 18px;
        margin-bottom: 10px;
        color: #66d9ef;
    `;

        const codeContainer = document.createElement('div');
        codeContainer.style.cssText = `
        display: flex;
        border: 1px solid #444;
        border-radius: 4px;
        height: 300px;
        overflow: hidden;
    `;

        const textAreaWrapper = document.createElement('div');
        textAreaWrapper.style.cssText = `
        flex-grow: 1;
        overflow: auto;
        position: relative;
    `;

        const textArea = document.createElement('textarea');
        textArea.id = 'codearea';
        textArea.style.cssText = `
        background-color: #282a36;
        color: #f8f8f2;
        border: none;
        padding: 10px;
        font-size: 14px;
        line-height: 1.5;
        resize: none;
        outline: none;
        white-space: pre;
        overflow-wrap: normal;
        overflow-x: scroll;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    `;
        textArea.placeholder = '// Type your code here';

        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 10px;
    `;

        const checkboxContainer = document.createElement('div');
        checkboxContainer.style.cssText = `
        display: flex;
        align-items: center;
        margin-right: auto;
    `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'closeAndExecCheckbox';
        checkbox.checked = closeAndExec;
        checkbox.style.marginRight = '5px';

        const checkboxLabel = document.createElement('label');
        checkboxLabel.htmlFor = 'closeAndExecCheckbox';
        checkboxLabel.textContent = 'Close & Exec';
        checkboxLabel.style.color = '#f8f8f2';

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkboxLabel);

        const okButton = document.createElement('button');
        okButton.textContent = 'Execute';
        okButton.style.cssText = `
        background-color: #50fa7b;
        color: #282a36;
        border: none;
        padding: 8px 16px;
        margin-right: 10px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
    `;

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.style.cssText = `
        background-color: #ff5555;
        color: #f8f8f2;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
    `;

        textAreaWrapper.appendChild(textArea);
        codeContainer.appendChild(textAreaWrapper);
        buttonContainer.appendChild(checkboxContainer);
        buttonContainer.appendChild(okButton);
        buttonContainer.appendChild(cancelButton);

        popup.appendChild(title);
        popup.appendChild(codeContainer);
        popup.appendChild(buttonContainer);

        document.body.appendChild(popup);

        TLN.append_line_numbers('codearea')
        
        checkbox.addEventListener('change', (e) => {
            closeAndExec = e.target.checked;
        });

        okButton.addEventListener('click', () => {
            const code = textArea.value;
            executeCode(code);
            if (closeAndExec) {
                togglePopup();
            }
        });

        cancelButton.addEventListener('click', togglePopup);

        return { popup, textArea, okButton, cancelButton };
    }

    function executeCode(code) {
        try {
            // Create a new Function to execute the code in the global scope
            new Function(code)();
        } catch (error) {
            console.error('Error executing code:', error);
        }
    }

    function togglePopup() {
        if (popup && document.body.contains(popup)) {
            document.body.removeChild(popup);
            popup = null;
        } else {
            createPopup();
        }
    }
    function keyHandler(event) {
        codePressedKeys.add(event.key);

        for (let key of codeKeys) {
            if (!codePressedKeys.has(key)) {
                return;
            }
        }

        togglePopup();
    }

    function keyUpHandler(event) {
        codePressedKeys.delete(event.key);
    }

    document.addEventListener('keydown', keyHandler);
    document.addEventListener('keyup', keyUpHandler);
})();



/*

function applyDiscordWidgetSetting() {
    const isEnabled = getCookie('ShowDiscordWidget') === 'true';
    const widgetCrate = document.querySelector('widgetbot-crate');

    if (widgetCrate) {
        if (isEnabled) {
            widgetCrate.style.display = 'block';
            widgetCrate.style.position = 'fixed';
            widgetCrate.style.bottom = '20px';
            widgetCrate.style.right = '20px';
            widgetCrate.style.zIndex = '1000';
        } else {
            widgetCrate.style.display = 'none';
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Load settings for discord widget when page loads
    applyDiscordWidgetSetting();
});
*/