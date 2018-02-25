import Figure from './Figure';
import Step from './hints/Step';
import king from '../images/figures/king.png';

export default class Soldier extends Figure{
    constructor(params){
        super(params);
        this.img = king;
    }
    constraints(figures){
        for (let i = 0; i < figures.length; i++){
            const figure = figures[i];
            if (figure.x === this.x && figure.y === this.y - 1){
                return
            }
        }
        return [
            new Step(this.x, this.y + 1)
        ]
    }
}