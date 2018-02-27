import red from '../../images/hints/red.svg';

export default class RangeAttack{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.img = red;
    }
    action(figure, figures){
        for (let i = 0; i < figures.length; i++){
            const f = figures[i];
            if (figure.x === f.x && figure.y === f.y){
                figures.splice(i, 1);
                return;
            }
        }
    }
}