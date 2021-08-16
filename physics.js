class Physics {
    static col_det_bb(b1, b2) {
        if (b1.r + b2.r >= Vector.Sub(b2.pos, b1.pos).Mag()) {
            return true;
        } else {
            return false;
        }
    }
    static pen_bb(b1, b2) {
        let dist = Vector.Sub(b1.pos, b2.pos)
        let pen_depth = b1.r + b2.r - dist.Mag()
        let pen_res = Vector.Mult(dist.Unit(), pen_depth / (b1.invMass + b2.invMass));
        b1.pos.Add(Vector.Mult(pen_res, b1.invMass))
        b2.pos.Add(Vector.Mult(pen_res, -b2.invMass))
    }
    static col_res_bb(b1, b2) {
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

    static closestPoint_bw(b1, w1) {
        let ballToW = Vector.Sub(w1.start, b1.pos)
        if (Vector.Dot(w1.wallUnit(), ballToW) > 0) {
            return w1.start;
        }
        let wallEtB = Vector.Sub(b1.pos, w1.end)
        if (Vector.Dot(w1.wallUnit(), wallEtB) > 0) {
            return w1.end
        }

        let closestDist = Vector.Dot(w1.wallUnit(), ballToW)
        let closestVect = Vector.Mult(w1.wallUnit(), closestDist);
        return Vector.Sub(w1.start, closestVect)
    }
    static col_det_bw(b1, w1) {
        let ballToClose = Vector.Sub(Physics.closestPoint_bw(b1, w1), b1.pos)
        return ballToClose.Mag() <= b1.r
    }
    static pen_bw(b1, w1) {
        let penVect = Vector.Sub(b1.pos, Physics.closestPoint_bw(b1, w1));
        b1.pos.Add(Vector.Mult(penVect.Unit(), b1.r-penVect.Mag()));
    }
    static col_res_bw(b1, w1) {
        let normal = Vector.Sub(b1.pos, Physics.closestPoint_bw(b1, w1)).Unit()
        let sepVel = Vector.Dot(b1.vel, normal);
        let new_sepVel = -sepVel * b1.elastic;
        let vsep_diff =  sepVel - new_sepVel;
        b1.vel.Add(Vector.Mult(normal, -vsep_diff));
    }
}