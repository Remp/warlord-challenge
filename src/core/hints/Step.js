import green from '../../images/hints/green.svg';

export default class Step{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.img = green;
    }
    action(figure){
        figure.x = this.x;
        figure.y = this.y;
    }
}