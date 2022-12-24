// Here is an example of how you could implement the server-side code for the chat component using Vercel's API routes:
const WebSocket = require("ws");
const wss = new WebSocket.Server({ noServer: true });

const groups = {};

wss.on("connection", (ws) => {
  const url = new URL(ws.upgradeReq.url, `ws://${ws.upgradeReq.headers.host}`);
  const groupName = url.pathname.split("/")[2];

  if (!groups[groupName]) {
    groups[groupName] = [];
  }
  groups[groupName].push(ws);

  ws.on("message", (message) => {
    groups[groupName].forEach((client) => {
      if (client !== ws) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    groups[groupName] = groups[groupName].filter((client) => client !== ws);
    if (groups[groupName].length === 0) {
      delete groups[groupName];
    }
  });
});

module.exports = (req, res) => {
  if (req.headers["sec-websocket-key"]) {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
  } else {
    if (req.method === "POST") {
      const { name } = req.body;
      if (!groups[name]) {
        groups[name] = [];
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } else if (req.method === "GET") {
      res.json(Object.keys(groups));
    }
  }

  function onConnect(ws) {
    ws.on("error", () => {});
  }
};

// This code creates a new web socket server using the WebSocket.Server constructor, and it sets the noServer option to true to indicate that it will not be using its own HTTP server. It then sets up a route using Vercel's module.exports function, which will handle both web socket connections and HTTP requests.
// For web socket connections, it uses the handleUpgrade method to handle the upgrade request and pass the web socket to the onConnect function. For HTTP requests, it checks the method and either creates a new group or retrieves the list of groups, depending on the request type.
// You can then deploy this code as an API route on Vercel, and use it in your React chat component by connecting to the appropriate URL.
