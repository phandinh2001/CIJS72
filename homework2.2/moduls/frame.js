import { Stopwatch } from "./clock.js";
class FrameClock {
  container;
  index = 4;
  listWatch = [];
  startAll;
  stopAll;

  constructor() {
    let body = document.querySelector("body");

    this.container = document.createElement("div");
    this.container.classList.add("container");

    let ol = document.createElement("ol");
    this.container.appendChild(ol);
    for (let i = 0; i < this.index; i++) {
      let li = document.createElement("li");
      this.listWatch.push(new Stopwatch());
      li.appendChild(this.listWatch[i].html());
      ol.appendChild(li);
    }

    this.startAll = document.createElement("button");
    this.startAll.innerHTML = "start All";
    this.startAll.addEventListener("click", this.handlerStartAll);

    this.stopAll = document.createElement("button");
    this.stopAll.innerHTML = "Stop All";
    this.stopAll.addEventListener("click", this.handlerStopAll)

    body.appendChild(this.container);
    this.container.appendChild(this.startAll);
    this.container.appendChild(this.stopAll);
  }

  handlerStartAll = () => {
    for (let i = 0; i < this.index; i++) {
      this.listWatch[i].handleStart();
    }
  };
  handlerStopAll = () => {
    for (let i = 0; i < this.index; i++) {
      this.listWatch[i].handleStop();
    }
  };
}
let app = document.getElementById("app");
let clock = new FrameClock();

app.appendChild(clock.container);