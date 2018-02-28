import Attack from '../hints/Attack';
import Step from '../hints/Step';

export default class Figure{
    constructor(params){
        this.x = params.x;
        this.y = params.y;
        this.suit = params.suit;
    }
    _getMostNear(figures, directions){
        const ret = [];
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
                    case 'up-left': 
                        if (f.y < this.y && f.x < this.x){
                            if (!mostNear || mostNear.y > f.y)
                                mostNear = f
                        }
                        break;
                    case 'up-right':
                        if (f.y < this.y && f.x > this.x){
                            if (!mostNear || mostNear.y > f.y)
                                mostNear = f
                        }
                        break;  
                    case 'down-right':
                        if (f.y > this.y && f.x > this.x){
                            if (!mostNear || mostNear.y > f.y)
                                mostNear = f
                        }
                        break;  
                    case 'down-left':
                        if (f.y > this.y && f.x < this.x){
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
    // check all specified cells whether there any fugires, if it doesn't, then add new Step hint
    _addStepsTo(hints, availableCells, figures){
        for (let j = 0; j < availableCells.length; j++){
            const cell = availableCells[j];
            let isFigureThere;
            for (let i = 0; i < figures.length; i++){
                const f = figures[i];
                if (f.x === cell.x && f.y === cell.y)
                    isFigureThere = true;
            }
            if (!isFigureThere)
                hints.push(new Step(cell.x, cell.y))
        }
    }
}
