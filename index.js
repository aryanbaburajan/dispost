// MongoDB
const { connectDB } = require("./database");
connectDB();

// Discord
const { connectBot } = require("./bot");
connectBot();
