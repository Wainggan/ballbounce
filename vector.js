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
        this.x = this.x * n;
        this.y = this.y * n;
    }
    static Mult(v, n) {
        return new Vector(v.x * n, v.y * n);
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