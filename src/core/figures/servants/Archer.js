import Figure from './Figure';
import Step from '../hints/Step';
import archery from '../../images/figures/archery.svg'
import Attack from '../hints/Attack';

export default class Archer extends Figure{
    constructor(params){
        super(params);
        this.range = params.range;
        this.img = archery;
    }
    constraints(figures){
        const ret = [];
        // find targets to kill
        const targets = this._getMostNear(figures);
        for (let i = 0; i < targets.length; i++){
            const figure = targets[i];
            ret.push(new Attack(figure.x, figure.y, false));
        }
        // find free cells to move
        const counter = ret.length;
        if (counter){
            for (let i = 0; i < counter; i++){
                const hint = ret[i];
                if (!(hint.x === this.x && hint.y === this.y + 1)) 
                    ret.push(new Step(this.x, this.y + 1)) 
                if (!(hint.x === this.x && hint.y === this.y - 1))
                    ret.push(new Step(this.x, this.y - 1))
                if (!(hint.x === this.x + 1 && hint.y === this.y))
                    ret.push(new Step(this.x + 1, this.y))
                if (!(hint.x === this.x - 1 && hint.y === this.y))
                    ret.push(new Step(this.x - 1, this.y))
            }
        }
        else{
            ret.push(new Step(this.x, this.y + 1), 
                    new Step(this.x, this.y - 1), 
                    new Step(this.x + 1, this.y), 
                    new Step(this.x - 1, this.y))
        }
        return ret;
    }
    _getMostNear(figures){
        const ret = [];
        const directions = ['up', 'down', 'right', 'left'];
        let counter = 0;
        for (let v = 0; v < directions.length; v++){
            let mostNear;
            const direction = directions[v];
            for (let j = 0; j < figures.length; j++){
                const f = figures[j];
                if (f.x === this.x && f.y === this.y)
                            continue;
                switch (direction){
                    case 'up':                       
                        if (f.x === this.x && f.y < this.y && f.y >= this.y - this.range){
                            if (!mostNear || mostNear.y < f.y) 
                                mostNear = f
                        }
                        break;   
                    case 'down':
                        if (f.x === this.x && f.y > this.y && f.y <= this.y + this.range){
                            if (!mostNear || mostNear.y > f.y)
                                mostNear = f
                        }
                        break;  
                    case 'right':
                        if (f.y === this.y && f.x > this.x && f.x <= this.x + this.range){
                            if (!mostNear || mostNear.y > f.y)
                                mostNear = f
                        }
                        break;    
                    case 'left':
                        if (f.y === this.y && f.x < this.x && f.x >= this.x + this.range){
                            if (!mostNear || mostNear.y > f.y)
                                mostNear = f
                        }
                        break;              
                }  
            }            
            mostNear && ret.push(mostNear);
        }
        return ret;
    }
}