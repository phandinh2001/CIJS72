class Stopwatch {
    count = 0;
    interval = null;
    insideClock;
    txtTime;
    btnStart;
    btnPause;
    isStarted;
    convertSecondToTime(seconds) {
      let mls = seconds % 100;
      let s = Math.floor(seconds / 100) % 60;
      let m = Math.floor(Math.floor(seconds / 100) / 60);
  
      if (mls < 10) mls = "0" + mls;
      if (s < 10) s = "0" + s;
      if (m < 10) m = "0" + m;
  
      return m + ":" + s + ":" + mls;
    }
  
    constructor() {
      this.insideClock = document.createElement("div");
  
      this.txtTime = document.createElement("span");
      this.txtTime.innerHTML = "00:00:00";
  
      this.btnStart = document.createElement("button");
      this.btnStart.innerHTML = "Start";
      this.btnStart.addEventListener("click", this.handleStart);
  
      this.btnPause = document.createElement("button");
      this.btnPause.innerHTML = "Pause";
      this.btnPause.addEventListener("click", this.handlePause);
  
      this.btnStop = document.createElement("button");
      this.btnStop.innerHTML = "Stop";
      this.btnStop.addEventListener("click", this.handleStop);
  
      this.insideClock.appendChild(this.txtTime);
      this.insideClock.appendChild(this.btnStart);
      this.insideClock.appendChild(this.btnPause);
      this.insideClock.appendChild(this.btnStop);
    }
    html() {
      return this.insideClock;
    }
  
    handleStart = () => {
      if (!this.isStarted) {
        this.interval = setInterval(() => {
          // run code
          this.count++;
          this.txtTime.innerHTML = this.convertSecondToTime(this.count);
        }, 1000);
        this.isStarted = true;
      } else {
        alert("Started");
      }
    };
  
    handlePause = () => {
      clearInterval(this.interval);
      this.isStarted = false;
    };
  
    handleStop = () => {
      clearInterval(this.interval);
      this.isStarted = false;
      this.count = 0;
      this.txtTime.innerHTML = this.convertSecondToTime(this.count);
    };
}
export{Stopwatch}