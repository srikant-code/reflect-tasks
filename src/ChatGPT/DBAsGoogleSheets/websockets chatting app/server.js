// server.js
// const WebSocket = require("ws");

// const wss = new WebSocket.Server({ port: 8080 });

// wss.on("connection", function connection(ws) {
//   ws.on("message", function incoming(message) {
//     console.log("received: %s", message);
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });
// });

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

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

const app = express();

app.post("/groups", (req, res) => {
  const { name } = req.body;
  if (!groups[name]) {
    groups[name] = [];
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get("/groups", (req, res) => {
  res.json(Object.keys(groups));
});

app.listen(3000);
