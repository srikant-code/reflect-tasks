// To create a Discord bot that displays your Notion notes, you will need to follow these steps:
// Follow the steps in my previous answer to create a Discord bot using the discord.js library.
// Use the Notion API and the notion-client library to fetch your notes from the Notion database. You will need to obtain an API key and authenticate with the Notion API as described in my previous answer.
// In your Discord bot, listen for a specific command that will trigger the fetching of the notes from the Notion database. You can do this by adding an event listener for the message event and checking the message content for the desired command.
// When the command is received, use the notion-client library to fetch the notes from the Notion database and store them in a variable.
// Use the discord.js library to send a message to the Discord channel containing the list of notes. You can use the map function to iterate over the array of notes and create a list of messages to send.
// Here is some example code that demonstrates how to create a Discord bot that fetches and displays your Notion notes:
const Discord = require("discord.js");
const NotionClient = require("notion-client");

const client = new Discord.Client();
const notion = new NotionClient({
  auth: "YOUR_API_KEY",
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  if (message.content === "!notes") {
    const notes = await fetchNotes(); // fetch notes from the Notion database
    notes.forEach((note) => {
      message.channel.send(note.title);
    });
  }
});

async function fetchNotes() {
  const queryResult = await notion.search({
    filter: {
      property: "object",
      value: "page",
    },
  });

  return queryResult.results;
}

client.login("YOUR_BOT_TOKEN");

// This code will create a Discord bot that listens for the command "!notes" and responds with a list of the titles of all pages in your Notion database. You can customize the bot's behavior by modifying the fetching of the notes and the formatting of the response message.
