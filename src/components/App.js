import React, {Component} from 'react';
import GameField from './Gamefield';

export default class App extends Component{
    render(){
        return (
            <div className="app">
                <GameField />
            </div>
        )
    }
}