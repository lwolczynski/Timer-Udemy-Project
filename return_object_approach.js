const createTimer = (timeInput, playBtn, pauseBtn, callbacks) => {
    return {
        timeInput: timeInput,
        timeAtStart: timeInput,
        playBtn: playBtn,
        pauseBtn: pauseBtn,
        timerRunning: false,
        initialize() {
            if (callbacks) {
                this.onStart = callbacks.onStart;
                this.onTick = callbacks.onTick;
                this.onComplete = callbacks.onComplete;
            };
            this.playBtn.addEventListener('click', this.start.bind(this));
            // this.play.addEventListener('click', () => this.start());  <-- alternative
            this.pauseBtn.addEventListener('click', this.pause.bind(this));
        },
        start() {
            if (!this.timerRunning) {
                if (this.onStart) {
                    this.onStart();
                    this.timeAtStart = this.timeInput.value;
                }
                this.interval = setInterval(() => this.tick(), 10);
                this.timerRunning = true;
            };
        },
        pause() {
            clearInterval(this.interval);
            this.timerRunning = false;
        },
        tick() {
            if (parseFloat(this.timeInput.value) <= 0) {
                    this.pause();
                if (this.onComplete) {
                    this.onComplete();
                }
            } else {
                this.timeInput.value = (parseFloat(this.timeInput.value) - 0.01).toFixed(2);
                if (this.onTick) {
                    this.onTick();
                }
            }
        }
    }
}

const timeInput = document.querySelector('input');
const playBtn = document.querySelector('#play');
const pauseBtn = document.querySelector('#pause');
const circle = document.querySelector('circle');

const perimeter = 2*circle.getAttribute('r')*Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let currentOffset = 0;
const timer = createTimer(timeInput, playBtn, pauseBtn, {
    onStart() {
    	console.log('Timer started');
    },
    onTick() {
        currentOffset = (perimeter*this.timeInput.value/this.timeAtStart) - perimeter;
        circle.setAttribute('stroke-dashoffset', currentOffset);
    },
    onComplete() {
    	console.log('Timer is completed');
    }
}).initialize();