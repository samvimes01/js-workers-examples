importScripts("./domain-sw.js");
const { decrement, getCounter, increment } = domainIIFE;

const TYPES = ["INCREMENT", "DECREMENT"];
const OPS = {
  INCREMENT: increment,
  DECREMENT: decrement,
};

const broadcastChannel = new BroadcastChannel("counter");

broadcastChannel.addEventListener("message", ({ data } = {}) => {
  if (!data || data.type === "RESULT") {
    return;
  }
  if (data.type === "INIT") {
    const counter = getCounter();

    console.log("SW: Service worker initialized; counter is ", counter);

    broadcastChannel.postMessage({ type: "RESULT", payload: counter });
    return;
  }

  onPortMessage(broadcastChannel)(data);
});

function onPortMessage(messagePort) {
  return (data) => {
    const { type } = data;
    if (!TYPES.includes(type)) {
      console.error("SW: Unknown operation type", type);
      return;
    }
    const result = OPS[type]();
    console.log("SW: Operation", type, "performed; counter is", result);
    messagePort.postMessage({
      type: "RESULT",
      payload: result,
    });
  };
}
