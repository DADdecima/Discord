const Eris = require("eris");
const keep_alive = require('./keep_alive.js');

const bot = new Eris(process.env.token);

bot.on("ready", async () => {
    console.log("Bot is online!");

    setInterval(async () => {
        const currentHour = new Date().getHours();
        
        try {
            const user = await bot.getSelf(); // Get your bot's own user info
            const presence = user.status; // Get current presence (online, idle, dnd, invisible)

            if (currentHour >= 0 && currentHour < 7) {
                if (presence === "dnd") {
                    console.log("Sleeping mode activated (12 AM - 7 AM)...");
                    bot.editStatus("invisible");
                } else {
                    console.log("Active from PC detected, skipping sleep mode.");
                }
            } else {
                console.log("Normal active hours, staying online.");
                bot.editStatus("online");
            }
        } catch (error) {
            console.error("Error fetching status:", error);
        }
    }, 60000); // Check every 60 seconds
});

bot.on("error", (err) => {
    console.error(err);
});

bot.connect();
