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
export default Object.assign({}, eventemmiter.prototype, {
    getState(){
        return state
    },
    addStateChangeListener(callback){
        this.on(constants.STATE_CHANGE, callback);
    },
    removeStateChangeListener(callback){
        this.removeListener(constants.STATE_CHANGE, callback);
    }
})