// import { decrement, getCounter, increment } from "./domain.js"; // fails in importScripts

var domainIIFE = (function (exports) {
  let counter = 0;

  function getCounter() {
    return counter;
  }

  function increment() {
    return ++counter;
  }

  function decrement() {
    return --counter;
  }

  exports.getCounter = getCounter;
  exports.increment = increment;
  exports.decrement = decrement;

  return exports;
})({});
