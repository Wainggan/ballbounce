class Ball {
    constructor(x = 0, y = 0, r = 20, m = 1) {
        this.pos = new Vector(x, y);
        this.r = r;

        this.elastic = 1;

        this.mass = m
        this.invMass = 0;
        if (this.mass != 0) {
            this.invMass = 1/this.mass
        }

        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
    }

    
    control() {
        let inputVec = new Vector(key.right - key.left, key.down - key.up).Unit()
        inputVec.Mult(0.1)
        this.vel.Add(inputVec)
    }
    updatePosition(dt = 1/60) {
        this.vel.Add(this.acc);
        this.vel.Mult(1)
        this.pos.Add(this.vel);
    }

    update() {
        this.updatePosition()

        for (let other of balls) {
            if (Physics.col_det_bb(this, other) && other != this) {
                Physics.pen_bb(this, other)
                Physics.col_res_bb(this, other)
            }
            
            
        }
        for (let other of walls) {
            if (Physics.col_det_bw(this, other)) {
                Physics.pen_bw(this,other)
                Physics.col_res_bw(this,other)
            }
        }
        
    }
    

    show() {
        draw_circle(this.pos.x, this.pos.y, this.r, true)
    }
}