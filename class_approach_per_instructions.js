class Timer {
    constructor(timeInput, playBtn, pauseBtn, callbacks) {
		this.timeInput = timeInput;
		this.playBtn = playBtn;
		this.pauseBtn = pauseBtn;
		this.timerRunning = false;
		if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}
  
		this.playBtn.addEventListener('click', this.start);
		this.pauseBtn.addEventListener('click', this.pause);
    }
  
    start = () => {
		if (!this.timerRunning) {
			if (this.onStart) {
				this.onStart();
			}
			this.interval = setInterval(this.tick, 1000);
			this.timerRunning = true;
		};
    };
  
    pause = () => {
		clearInterval(this.interval);
		this.timerRunning = false;
    };
  
    tick = () => {
      	if (this.timeRemaining <= 0) {
				this.pause();
			if (this.onComplete) {
				this.onComplete();
			}
      	} else {
        	this.timeRemaining = this.timeRemaining - 1;
        	if (this.onTick) {
         		this.onTick();
        	}
    	}
    };
  
    get timeRemaining() {
    	return parseFloat(this.timeInput.value);
    }
  
    set timeRemaining(time) {
    	this.timeInput.value = time;
    }
}
  
const timeInput = document.querySelector('input');
const playBtn = document.querySelector('#play');
const pauseBtn = document.querySelector('#pause');
  
const timer = new Timer(timeInput, playBtn, pauseBtn, {
    onStart() {
    	console.log('Timer started');
    },
    onTick() {
    	console.log('Timer just ticked down');
    },
    onComplete() {
    	console.log('Timer is completed');
    }
});
  