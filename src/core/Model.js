import eventemmiter from 'events';
import constants from './constants';
import Soldier from './figures/servants/Soldier';
import Archer from './figures/servants/Archer';

const figures = [new Soldier({x:3, y:2}), new Soldier({x:3, y:3}), new Archer({x: 0, y:5, range: 3})];
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
        // if hint clicked, then do action according to type of hint
        for (let i = 0; i < hints.length; i++){
            const hint = hints[i];
            if (hint.x === x && hint.y === y){
                hint.action(selected, figures);
                selected = null;
                this._setHints();
                this.emit(constants.FIGURES_CHANGE);
                return;
            }
        }
        selected = null;
        // if clicked on figure, then select it
        for (let i = 0; i < figures.length; i++){
            const figure = figures[i];
            if (figure.x === x && figure.y === y){
                this._setSelection(figure);
                return;
            }
        }
        // if clicked on empty field, then reset
        this._setSelection();
    },
})