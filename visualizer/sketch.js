var song
var fft
var particles = []
var currentSong = 0

function preload() {
    songs = [
        loadSound('./files/sound1.mp3'),
        loadSound('./files/sound2.mp3'),
        loadSound('./files/sound3.mp3'),
        loadSound('./files/sound4.mp3'),
        loadSound('./files/sound5.mp3'),
        loadSound('./files/sound6.mp3'),
        loadSound('./files/sound7.mp3'),
        loadSound('./files/sound8.mp3'),
        loadSound('./files/sound9.mp3'),
        loadSound('./files/sound10.mp3'),
        loadSound('./files/sound11.mp3'),
        loadSound('./files/sound12.mp3'),
        loadSound('./files/sound13.mp3'),
        loadSound('./files/sound14.mp3'),
        loadSound('./files/sound15.mp3'),
        loadSound('./files/sound16.mp3'),
        loadSound('./files/sound17.mp3'),
        loadSound('./files/sound18.mp3'),
        loadSound('./files/sound19.mp3'),
        loadSound('./files/sound20.mp3'),
    ]
}

function setup() {
    createCanvas(visualViewport.width, visualViewport.height)
    songs[currentSong].loop();
    // noLoop()
    // angleMode(DEGREES)
    rectMode(CENTER)
    textSize(44);

    fft = new p5.FFT(.5)
}

function draw() {
    background('#414141');

    fill(255)
    text(currentSong, 15, 50);

    translate(width / 2, height / 2)

    fft.analyze()
    amp = fft.getEnergy(20, 200)

    var alpha = map(amp, 0, 255, 50, 220)
    fill(10, alpha)
    noStroke()
    rect(0,0,width,height)

    stroke(amp,181,0, alpha) // 255 181 0
    strokeWeight(1);
    // noFill()

    var wave = fft.waveform()

    for (var t = -1; t <= 1; t++) {
        beginShape()
        for (let i = 0; i <= 360; i += 0.4) {

            var index = floor(map(i, 0, 180, 0, wave.length))

            var r = map(wave[index]*2, .6, 1, 0, amp)

            var x = r * sin(i)
            var y = r * cos(i)

            vertex(x, y)
        }
        endShape()
    }

    particles.push(new Particle())

    for (var i = particles.length - 1; i >= 0; i--) {
        if (particles[i].edges()) {
            particles.slice(i, 1)
        } else {
            particles[i].update(amp)
            particles[i].show(amp)
        }
    }
}

function mouseClicked() {
    if (!songs[currentSong].isPlaying()) {
        songs[currentSong].play()
        loop()
    } else {
        songs[currentSong].pause()
        noLoop()
    }
}

function keyPressed() {
    if (songs[currentSong].isPlaying()) {
        if (key === 'ArrowRight') {
            songs[currentSong].jump(songs[currentSong].currentTime() + 5)
        }

        if (key === 'ArrowLeft') {
            songs[currentSong].jump(songs[currentSong].currentTime() - 5)
        }

        if (key === ' ' || key === 'Escape') {
            songs[currentSong].pause()
            noLoop()
        }

        console.log()

        if (key === 'ArrowUp') {
            songs[currentSong].stop()

            currentSong++

            if (currentSong > songs.length - 1) {
                currentSong = 0
            }

            songs[currentSong].play()
        }

        if (key === 'ArrowDown') {
            songs[currentSong].stop()

            currentSong--

            if (currentSong < 0) {
                currentSong = songs.length - 1
            }

            songs[currentSong].play()
        }
    }
}

class Particle {
    constructor() {
        this.pos = p5.Vector.random2D().mult(random(10, 250))
        this.vel = createVector(0, 0)
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

        this.col = [random(180,255),random(180,255),random(180,255)]

        this.w = random(3, 6)
    }

    update(amp) {
        this.vel.add(this.acc)
        this.pos.add(this.vel)

        if (amp > 210) {
            for (let i = 0; i < amp/6; i++) {
                this.pos.add(this.vel)
            }
        }
    }

    edges() {
        return this.pos.x < -width / 2 || this.pos.x > width / 2 || this.pos.y < -height / 2 || this.pos.y > height / 2
    }

    show(amp) {
        // stroke('rgba(0,255,34,0.49)')
        // noStroke()

        if (amp < 210) {
            fill(0, map(amp, 0, 200, 0, 200))
            noStroke()
        }

        ellipse(this.pos.x, this.pos.y, this.w)
    }
}
