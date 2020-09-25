class Timer {
    constructor(timeInput, playBtn, pauseBtn, callbacks) {
		this.timeInput = timeInput;
		this.timeAtStart = timeInput;
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
				this.timeAtStart = this.timeRemaining;
			}
			this.interval = setInterval(this.tick, 10);
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
        	this.timeRemaining = this.timeRemaining - 0.01;
        	if (this.onTick) {
         		this.onTick();
        	}
    	}
    };
  
    get timeRemaining() {
    	return parseFloat(this.timeInput.value);
    }
  
    set timeRemaining(time) {
    	this.timeInput.value = time.toFixed(2);
    }
}
  
const timeInput = document.querySelector('input');
const playBtn = document.querySelector('#play');
const pauseBtn = document.querySelector('#pause');
const circle = document.querySelector('circle');

const perimeter = 2*circle.getAttribute('r')*Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let currentOffset = 0;
const timer = new Timer(timeInput, playBtn, pauseBtn, {
    onStart() {
    	console.log('Timer started');
    },
    onTick() {
		currentOffset = (perimeter*this.timeRemaining/this.timeAtStart) - perimeter;
		circle.setAttribute('stroke-dashoffset', currentOffset);
    },
    onComplete() {
    	console.log('Timer is completed');
    }
});
  