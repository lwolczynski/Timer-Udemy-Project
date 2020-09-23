class Timer {
    constructor(timeInput, playBtn, pauseBtn, callbacks) {
        this.timeInput = timeInput;
        this.playBtn = playBtn;
        this.pauseBtn = pauseBtn;
        if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}
        this.addListeners();
    }
    addListeners() {
        this.playBtn.addEventListener('click', this.start.bind(this));
        // this.play.addEventListener('click', () => this.start());  <-- alternative
        this.pauseBtn.addEventListener('click', this.pause.bind(this));
    };
    start() {
        if (this.onStart) {
        	this.onStart();
      	}
        this.interval = setInterval(this.tick, 1000);
    };
    pause() {
        clearInterval(this.interval);
    };
    tick = () => {
        if (parseFloat(this.timeInput.value) <= 0) {
                this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeInput.value = parseFloat(this.timeInput.value) - 1;
            if (this.onTick) {
                this.onTick();
            }
        }
    };
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