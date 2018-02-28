import eventemmiter from 'events';
import constants from './constants';
import Soldier from './figures/servants/Soldier';
import Archer from './figures/servants/Archer';
import Kiroku from './figures/heroes/Kiroku';
import suits from './suits';

const figures = [
    new Soldier({x:3, y:2, suit: suits.BLACK}), 
    new Soldier({x:3, y:3, suit: suits.BLACK}), 
    new Archer({x: 0, y:5, range: 3, suit: suits.WHITE}),
    new Kiroku({x: 0, y:0, suit: suits.WHITE})
];
let hints = [];
let selected;
let turn = suits.WHITE;
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
    addSuitChangeListener(callback){
        this.on(constants.SUIT_CHANGED, callback);
    },
    removeSuitChangeListener(callback){
        this.removeListener(constants.SUIT_CHANGED, callback);
    },
    // choose figure on field
    _setSelection(figure){
        selected = figure;
        this.emit(constants.SELECTION_CHANGED);
        if (!figure){
            this._setHints();
            return;
        }
        if (figure.suit === turn)
            this._setHints();
    },
    _setHints(){
        hints = selected ? selected.constraints(this) : [];
        this.emit(constants.HINTS_CHANGED);
    },
    _suitChange(){
        turn = turn === suits.BLACK ? suits.WHITE : suits.BLACK;
        this.emit(constants.SUIT_CHANGED);
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
                // change suit to turn
                this._suitChange();
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