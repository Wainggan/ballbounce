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


class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    Add(v) {
        this.x += v.x;
        this.y += v.y;
    }
    static Add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    Sub(v) {
        this.x -= v.x;
        this.y -= v.y;
    }
    static Sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y)
    }
    Mag() {
        return Math.sqrt(this.x**2 + this.y**2);
    }
    Mult(n) {
        return new Vector(this.x * n, this.y * n);
    }
    Unit() {
        let m = this.Mag();
        if (m == 0) {
            return new Vector(0, 0)
        }
        return new Vector(this.x / m, this.y / m);
    }
    Normal() {
        return new Vector(-this.y, this.x).Unit()
    }
    static Dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    show(startX = 0, startY = 0, mag = 1, c = "black") {
        ctx.beginPath();
        ctx.moveTo(startX, startY)
        ctx.lineTo(startX + this.x * mag, startY + this.y * mag);
        ctx.strokeStyle = c;
        ctx.stroke()
    }
}




class Ball {
    constructor(x = 0, y = 0, r = 20) {
        this.pos = new Vector(x, y);
        this.r = r;

        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
    }

    static col_ball(b1, b2) {
        if (b1.r + b2.r >= Vector.Sub(b2.pos, b1.pos).Mag()) {
            return true;
        } else {
            return false;
        }
    }
    static pen_ball(b1, b2) {
        let dist = Vector.Sub(b1.pos, b2.pos)
        let pen_depth = b1.r + b2.r - dist.Mag()
        let pen_res = dist.Unit().Mult(pen_depth/2)
        b1.pos.Add(pen_res)
        b2.pos.Add(pen_res.Mult(-1))
    }

    update() {
        this.vel.Add(this.acc);
        this.pos.Add(this.vel);

        for (let b of balls) {
            if (Ball.col_ball(this, b)) {
                Ball.pen_ball(this, b)
            }
        }
        
    }
    control() {
        let inputVec = new Vector(key.right - key.left, key.down - key.up).Unit().Mult(3)
        this.pos.Add(inputVec)
    }

    show() {
        draw_circle(this.pos.x, this.pos.y, this.r, true)
    }
}




let balls = [];

for (let i = 0; i < 20; i++) {
    balls.push(new Ball(Math.random() * canvas.clientWidth, Math.random() * canvas.clientHeight, Math.random() * 20 + 10))
}

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