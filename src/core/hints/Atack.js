export default class Attack{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    action(figure, figures){
        for (let i = 0; i < figures.length; i++){
            const f = figures[i];
            if (figure.x === f.x && figure.y === f.y){
                figures.splice(i, 1);
                return;
            }
        }
        figure.x = this.x;
        figure.y = this.y;
    }
}