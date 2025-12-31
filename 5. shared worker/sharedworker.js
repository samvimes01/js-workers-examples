// both static import and importScripts are valid in all browsers
import { decrement, getCounter, increment } from "./domain.js";

// importScripts("./domain-sw.js");
// const { decrement, getCounter, increment } = domainIIFE;

const TYPES = ["INCREMENT", "DECREMENT"];
const OPS = {
  INCREMENT: increment,
  DECREMENT: decrement,
};

onconnect = (e) => {
  const messagePort = e.ports[0];

  messagePort.onmessage = onPortMessage(messagePort);

  const counter = getCounter();

  messagePort.postMessage({ type: "RESULT", payload: counter });

  console.log("SW: Shared worker initialized; counter is ", counter);

  // Required when using messagePort.addEventListener. Otherwise called implicitly by onmessage setter.
  // messagePort.start();
};

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
