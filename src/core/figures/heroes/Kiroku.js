import Hero from './Hero';
import Step from '../../hints/Step';
import helmet from '../../../images/figures/helmet.svg'
import Attack from '../../hints/Attack';

export default class Kiroku extends Hero{
    constructor(params){
        super(params);
        this.img = helmet;
    }
    constraints(model){
        const figures = model.getFigures();
        const ret = [];
        // find tagets to kill
        const targets = this._getMostNear(figures);
        for (let i = 0; i < targets.length; i++){
            const figure = targets[i];
            ret.push(new Attack(figure.x, figure.y));
        }
        // find available cells to move
        const availableCells = [
            {x: this.x, y: this.y + 1},
            {x: this.x, y: this.y - 1},
            {x: this.x + 1, y: this.y + 1},
            {x: this.x - 1, y: this.y + 1},
            {x: this.x + 1, y: this.y - 1},
            {x: this.x - 1, y: this.y - 1},
            {x: this.x + 1, y: this.y},
            {x: this.x - 1, y: this.y}
        ]
        for (let j = 0; j < availableCells.length; j++){
            const cell = availableCells[j];
            let isFigureThere;
            for (let i = 0; i < figures.length; i++){
                const f = figures[i];
                if (f.x === cell.x && f.y === cell.y)
                    isFigureThere = true;
            }
            if (!isFigureThere)
                ret.push(new Step(cell.x, cell.y))
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
                        if (f.x === this.x && f.y < this.y){
                            if (!mostNear || mostNear.y < f.y) 
                                mostNear = f
                        }
                        break;   
                    case 'down':
                        if (f.x === this.x && f.y > this.y){
                            if (!mostNear || mostNear.y > f.y)
                                mostNear = f
                        }
                        break;  
                    case 'right':
                        if (f.y === this.y && f.x > this.x){
                            if (!mostNear || mostNear.y > f.y)
                                mostNear = f
                        }
                        break;    
                    case 'left':
                        if (f.y === this.y && f.x < this.x){
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