const broadcastChannel = new BroadcastChannel("counter");

broadcastChannel.addEventListener("message", ({ data } = {}) => {
  if (!data) return;
  console.log("Another SW: Received message", data);
  if (data.type === "RESULT") {
    broadcast({ type: "ECHO", data: data.payload });
  }
});

async function broadcast(packet) {
  const clients = await self.clients.matchAll({
    includeUncontrolled: true,
  });
  for (const client of clients) {
    console.log("Broadcasting to:", client.id);
    client.postMessage(packet);
  }
}
