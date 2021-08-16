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


let balls = [];

for (let i = 0; i < 0; i++) {
    balls.push(new Ball(Math.random() * canvas.clientWidth, Math.random() * canvas.clientHeight, Math.random() * 20 + 10))
}
balls.push(new Ball(Math.random() * canvas.clientWidth, Math.random() * canvas.clientHeight, Math.random() * 20 + 10, 2))
balls.push(new Ball(Math.random() * canvas.clientWidth, Math.random() * canvas.clientHeight, Math.random() * 20 + 10, 0))

function mainLoop() {
    balls[0].control()
    for (let b of balls) {
        b.update()
    }
    

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    for (let b of balls) {
        b.show()
    }
    requestAnimationFrame(mainLoop)
}
requestAnimationFrame(mainLoop)