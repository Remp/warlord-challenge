import Servant from './Servant';
import Step from '../../hints/Step';
import archery from '../../../images/figures/archery.svg'
import Attack from '../../hints/Attack';

export default class Archer extends Servant{
    constructor(params){
        super(params);
        this.range = params.range;
        this.img = archery;
    }
    constraints(model){
        const figures = model.getFigures();
        const ret = [];
        // find targets to kill
        const targets = this._getMostNear(figures, ['up', 'down', 'right', 'left']);
        for (let i = 0; i < targets.length; i++){
            const figure = targets[i];
            if (figure.suit !== this.suit)
                ret.push(new Attack(figure.x, figure.y, false));
        }
        // find free cells to move
        const availableCells = [
            {x: this.x, y: this.y - 1},
            {x: this.x, y: this.y + 1},
            {x: this.x - 1, y: this.y},
            {x: this.x + 1, y: this.y},
        ]
        this._addStepsTo(ret, availableCells, figures);
        return ret;
    }
}