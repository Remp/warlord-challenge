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
        const availableCells = [
            {x: this.x, y: this.y - 1},
            {x: this.x, y: this.y + 1},
            {x: this.x - 1, y: this.y},
            {x: this.x + 1, y: this.y},
        ]
        // find targets to kill
        for (let i = 0; i < figures.length; i++){
            const figure = figures[i];
            for (let j = 0; j < availableCells.length; j++){
                const cell = availableCells[j];
                if (figure.x === cell.x && figure.y === cell.y)
                    ret.push(new Attack(cell.x, cell.y))
            }
        }
        // find free cells to move
        this._addStepsTo(ret, availableCells, figures);
        return ret;
    }
}