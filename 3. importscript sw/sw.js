// import { decrement, getCounter, increment } from "./domain.js"; // fails in all browsers

importScripts("./domain-sw.js");
const { decrement, getCounter, increment } = domainIIFE;

const TYPES = ["INCREMENT", "DECREMENT"];
const OPS = {
  INCREMENT: increment,
  DECREMENT: decrement,
};

self.addEventListener("message", ({ data, ports } = {}) => {
  if (!ports[0] || !data || data.type !== "INIT") {
    return;
  }
  const messagePort = ports[0];

  messagePort.onmessage = onPortMessage(messagePort);

  const counter = getCounter();

  messagePort.postMessage({ type: "RESULT", payload: counter });

  console.log("SW: Service worker initialized; counter is ", counter);
});

function onPortMessage(messagePort) {
  return ({ data }) => {
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
