class Figure{
    constructor(params){
        this.x = params.x;
        this.y = params.y;
    }
    static moveTo(x, y){
        this.x = x;
        this.y = y;
    }
}
export default Figure;