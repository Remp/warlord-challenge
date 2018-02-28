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
        const targets = this._getMostNear(figures, ['up', 'down', 'right', 'left']);
        for (let i = 0; i < targets.length; i++){
            const figure = targets[i];
            if (figure.suit !== this.suit)
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
        this._addStepsTo(ret, availableCells, figures);
        return ret;
    }
}