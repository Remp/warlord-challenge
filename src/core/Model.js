import eventemmiter from 'events';
import constants from './constants';
import Soldier from './Soldier';

const figures = [new Soldier({x:3, y:2})];
let hints = [];
let selected;
export default Object.assign({}, eventemmiter.prototype, {
    getFigures(){
        return figures
    },
    getHints(){
        return hints
    },
    getFieldSize(){
        return {
            w: 10,
            h: 10
        }
    },
    addFiguresChangeListener(callback){
        this.on(constants.FIGURES_CHANGE, callback);
    },
    removeFiguresChangeListener(callback){
        this.removeListener(constants.FIGURES_CHANGE, callback);
    },
    addHintsChangeListener(callback){
        this.on(constants.HINTS_CHANGED, callback);
    },
    removeHintsChangeListener(callback){
        this.removeListener(constants.HINTS_CHANGED, callback);
    },
    // choose figure on field
    _setSelection(figure){
        selected = figure;
        this.emit(constants.SELECTION_CHANGED);
        this._setHints();
    },
    _setHints(){
        hints = selected ? selected.constraints(figures) : [];
        this.emit(constants.HINTS_CHANGED);
    },
    selectField(x, y){
        selected = null;
        for (let i = 0; i < figures.length; i++){
            const figure = figures[i];
            if (figure.x === x && figure.y === y){
                this._setSelection(figure);
                return;
            }
        }
        this._setSelection();
    },
})