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