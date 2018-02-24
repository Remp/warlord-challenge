import eventemmiter from 'events';
import constants from './constants';

const state = [
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
]
const figures = [];
const hints = [];
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
    selectField(x, y){
        selected = null;
        for (let i = 0; i < figures.length; i++){
            const figure = figures[i];
            if (figure){
                selected = figure;
                this._selectionChanged();
            }
        }
    },
    _selectionChanged(){
        hints = selected.contraints(figures);
        this.emit(constants.HINTS_CHANGED, hints);
    }
})