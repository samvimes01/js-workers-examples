let counter = 0;

export function init() {
  counter = localStorage.getItem('counter') || 0;
  return counter;
}

function saveCounter() {
  localStorage.setItem('counter', counter);
}

export function increment() {
  counter++;
  saveCounter();
  return counter;
}

export function decrement() {
  counter--;
  saveCounter();
  return counter;
}

