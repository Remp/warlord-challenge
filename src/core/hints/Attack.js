import red from '../../images/hints/red.svg';

export default class Attack{
    constructor(x, y, isMove = true){
        this.x = x;
        this.y = y;
        this.isMove = isMove;
        this.img = red;
    }
    action(selected, figures){
        for (let i = 0; i < figures.length; i++){
            const f = figures[i];
            if (f.x === selected.x && f.y === selected.y)
                continue;
            if (this.x === f.x && this.y === f.y){
                figures.splice(i, 1);
                if (this.isMove){
                    selected.x = this.x;
                    selected.y = this.y;
                }
                return;
            }
        }
        
    }
}