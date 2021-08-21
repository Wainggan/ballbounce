const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

//const video = document.querySelector("video");

// input
let key = {
    left: false,
    right: false,
    up: false,
    down: false
}
canvas.addEventListener("keydown", (k) => {
    switch (k.key) {
        case "w":
            key.up = true;
            break;
        case "a":
            key.left = true;
            break;
        case "d":
            key.right = true;
            break;
        case "s":
            key.down = true;
            break;
    }
})
canvas.addEventListener("keyup", (k) => {
    switch (k.key) {
        case "w":
            key.up = false;
            break;
        case "a":
            key.left = false;
            break;
        case "d":
            key.right = false;
            break;
        case "s":
            key.down = false;
            break;
    }
})

// draw functions
function draw_circle(x, y, r = 10, color = "red", fill = false) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.strokeStyle = color;
    ctx.stroke();
    if (fill) {
        ctx.fillStyle = color;
        ctx.fill();
    }
}
function draw_line(x1, y1, x2, y2, color = "black") {
    ctx.beginPath();
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.stroke();
}

// helper functions
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// i hate myself
class Color {
    constructor(r = -1, g = -1, b = -1) {
        this.r = r
        this.g = g
        this.b = b
        if (r != -1 && (g == -1 || b == -1)) {
            this.g = r
            this.b = r
        }
    }
    Hex() {
        let rS = parseInt(this.r, 10).toString(16).padStart(2, "0")
        let gS = parseInt(this.g, 10).toString(16).padStart(2, "0")
        let bS = parseInt(this.b, 10).toString(16).padStart(2, "0")

        return "#" + rS + gS + bS
    }
    static Hex(r=0, g=0, b=0) {
        let rS = parseInt(r, 10).toString(16).padStart(2, "0")
        let gS = parseInt(g, 10).toString(16).padStart(2, "0")
        let bS = parseInt(b, 10).toString(16).padStart(2, "0")

        return "#" + rS + gS + bS
    }
}

let backgroundColor = new Color(100)


ctx.canvas.width  = 1920//window.innerWidth;
ctx.canvas.height = 1080//window.innerHeight;

let balls = [];
let walls = [];

// border walls
{
    let winW = canvas.clientWidth
    let winH = canvas.clientHeight

    walls.push(new Wall(0-1, 0-1, winW, 0-1))
    walls.push(new Wall(winW, 0-1, winW, winH))
    walls.push(new Wall(winW, winH, 0-1, winH))
    walls.push(new Wall(0-1, winH, 0-1, 0-1))

}

{
    let density = Math.round(Math.min(canvas.clientWidth, canvas.clientHeight) / 5)

    for (let i = 0; i < density; i++) {
        let ma = randomRange(15, 30)
        let b = new Ball(randomRange(0, canvas.clientWidth), randomRange(0, canvas.clientHeight), ma, ma)
        b.vel.x = randomRange(-2, 2)
        b.vel.y = randomRange(-2, 2)
        b.vel = b.vel.Unit()
        b.color = Color.Hex(randomRange(150, 255), randomRange(100, 150), randomRange(150, 255))
        balls.push(b)
    }
}

// i hate javascript
/*
//const recorder = new CanvasRecorder(canvas,4500000);
var videoStream = canvas.captureStream(30);

var mediaRecorder = new MediaRecorder(videoStream, {
    audioBitsPerSecond: 0,
    //videoBitsPerSecond: 20971520
    bitsPerSecond: 20971520
});
var chunks = [];
mediaRecorder.ondataavailable = function(e) {
  chunks.push(e.data);
};
mediaRecorder.onstop = function(e) {
    var blob = new Blob(chunks, { 'type' : 'video/mp4' });
    chunks = [];
    var videoURL = URL.createObjectURL(blob);
    video.src = videoURL;
};
mediaRecorder.ondataavailable = function(e) {
    chunks.push(e.data);
};
mediaRecorder.start();
//setTimeout(function (){ mediaRecorder.stop(); }, 5000);

let totalFrames = 0
*/

//recorder.start();
function mainLoop() {

    for (let b of balls) {
        b.update()

    }
    
    
    ctx.rect(0, 0, canvas.clientWidth, canvas.clientHeight)
    ctx.fillStyle = backgroundColor.Hex();
    ctx.fill();
    for (let b of balls) {
        b.show()
    }
    for (let w of walls) {
        w.show()
    }
    

    requestAnimationFrame(mainLoop)

    /*
    if (totalFrames != -1) {
        totalFrames++
    }
    if (totalFrames >= 60 * 5) {
        //recorder.stop();
        //let fileName = Math.floor(Math.random()*9999999).toString()
        //recorder.save(fileName+'.webm');
        mediaRecorder.stop();
        totalFrames = -1;
    }
    */
}
requestAnimationFrame(mainLoop)