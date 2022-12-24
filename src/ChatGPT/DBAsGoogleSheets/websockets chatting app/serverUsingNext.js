// This code uses Next.js to handle the server-side rendering of the React components, and it integrates the web socket server into the same Express server instance. It uses the same logic as the previous example to handle the creation and management of groups, and it adds
const WebSocket = require("ws");
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const wss = new WebSocket.Server({ server });

  const groups = {};

  wss.on("connection", (ws) => {
    const url = new URL(
      ws.upgradeReq.url,
      `ws://${ws.upgradeReq.headers.host}`
    );
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

  server.post("/groups", (req, res) => {
    const { name } = req.body;
    if (!groups[name]) {
      groups[name] = [];
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });

  server.get("/groups", (req, res) => {
    res.json(Object.keys(groups));
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
