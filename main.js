const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

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
function draw_circle(x, y, r = 10, fill = false) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.strokeStyle = "black";
    ctx.stroke();
    if (fill) {
        ctx.fillStyle = "red";
        ctx.fill();
    }
}
function draw_line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = "black"
    ctx.stroke();
}



let balls = [];
let walls = [];

{
    let winW = canvas.clientWidth
    let winH = canvas.clientHeight

    walls.push(new Wall(0, 0, winW, 0))
    walls.push(new Wall(winW, 0, winW, winH))
    walls.push(new Wall(winW, winH, 0, winH))
    walls.push(new Wall(0, winH, 0, 0))

}

for (let i = 0; i < 32; i++) {
    let b = new Ball(Math.random() * canvas.clientWidth, Math.random() * canvas.clientHeight, Math.random() * 20 + 10, Math.random() * 10 + 5)
    b.vel.x = Math.random() * 4 - 2
    b.vel.y = Math.random() * 4 - 2
    b.vel = b.vel.Unit()
    balls.push(b)
}


function mainLoop() {
    for (let b of balls) {
        b.update()

    }
    

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    for (let b of balls) {
        b.show()
    }
    for (let w of walls) {
        w.show()
    }
    

    requestAnimationFrame(mainLoop)
}
requestAnimationFrame(mainLoop)