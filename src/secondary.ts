const timerEl = document.getElementById("timer")!;
const okEl = document.getElementById("ok")!;
const failEl = document.getElementById("fail")!;
const statusEl = document.getElementById("status")!;

const API = "https://httpbin.org/delay/2";
let ok = 0;
let fail = 0;
let elapsed = 0;
let running = true;

function update() {
  timerEl.textContent = `${elapsed}s`;
  okEl.textContent = String(ok);
  failEl.textContent = String(fail);
}

const timer = setInterval(() => {
  elapsed++;
  update();
}, 1000);

async function requestLoop() {
  while (running) {
    statusEl.textContent = "Requesting...";
    try {
      const start = performance.now();
      const res = await fetch(API);
      const ms = (performance.now() - start).toFixed(0);
      ok++;
      statusEl.textContent = `OK ${res.status} (${ms}ms)`;
    } catch (e: unknown) {
      fail++;
      statusEl.textContent = `ERR: ${(e as Error).message || e}`;
    }
    update();
  }
}

requestLoop();
