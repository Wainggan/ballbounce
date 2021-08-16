class Ball {
    constructor(x = 0, y = 0, r = 20, m = 1) {
        this.pos = new Vector(x, y);
        this.r = r;

        this.elastic = 0.99;

        this.mass = m
        this.invMass = 0;
        if (this.mass != 0) {
            this.invMass = 1/this.mass
        }

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
        let pen_res = Vector.Mult(dist.Unit(), pen_depth / (b1.invMass + b2.invMass));
        b1.pos.Add(Vector.Mult(pen_res, b1.invMass))
        b2.pos.Add(Vector.Mult(pen_res, -b2.invMass))
    }

    static colRes_ball(b1, b2) {
        let normal = Vector.Sub(b1.pos, b2.pos).Unit()
        let relVel = Vector.Sub(b1.vel, b2.vel);
        let sepVel = Vector.Dot(relVel, normal);
        let new_sebVel = -sepVel * Math.min(b1.elastic, b2.elastic);
        let sepVelVec = Vector.Mult(normal, new_sebVel)

        let vsep_diff = new_sebVel - sepVel;
        let impulse = vsep_diff / (b1.invMass + b2.invMass)
        let impulseVec = Vector.Mult(normal, impulse)

        b1.vel.Add(Vector.Mult(impulseVec, b1.invMass))
        b2.vel.Add(Vector.Mult(impulseVec, -b2.invMass))
    }
    
    control() {
        let inputVec = new Vector(key.right - key.left, key.down - key.up).Unit()
        inputVec.Mult(0.5)
        this.vel.Add(inputVec)
    }
    updatePosition(dt = 1/60) {
        this.vel.Add(this.acc);
        this.vel.Mult(0.9)
        this.pos.Add(this.vel);
    }

    update() {
        this.updatePosition()

        for (let b of balls) {
            if (Ball.col_ball(this, b) && b != this) {
                Ball.pen_ball(this, b)
                Ball.colRes_ball(this, b)
            }
            
        }
        
    }
    

    show() {
        draw_circle(this.pos.x, this.pos.y, this.r, true)
    }
}