import Servant from './Servant';
import Step from '../../hints/Step';
import horse from '../../../images/figures/horse.svg';
import Attack from '../../hints/Attack';

export default class Soldier extends Servant{
    constructor(params){
        super(params);
        this.img = horse;
    }
    constraints(model){
        const figures = model.getFigures();
        const ret = [];
        // find targets to kill
        for (let i = 0; i < figures.length; i++){
            const figure = figures[i];
            if (figure.x === this.x && figure.y === this.y + 1)
                ret.push(new Attack(this.x, this.y + 1))
            if (figure.x === this.x && figure.y === this.y - 1)
                ret.push(new Attack(this.x, this.y - 1))
            if (figure.x === this.x + 1 && figure.y === this.y)
                ret.push(new Attack(this.x + 1, this.y))
            if (figure.x === this.x - 1 && figure.y === this.y)
                ret.push(new Attack(this.x - 1, this.y))
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
}