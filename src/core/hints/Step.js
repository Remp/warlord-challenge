import paw from '../../images/hints/paw.png';

export default class Step{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.img = paw;
    }
    action(figure){
        figure.x = this.x;
        figure.y = this.y;
    }
}