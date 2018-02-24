import React, {Component} from 'react';
import model from '../core/Model';
import $ from 'jquery';

class Gamefield extends Component{
    constructor(){
        super();
        this.renderDesk = this.renderDesk.bind(this);
        this.onResizeHandler = this.onResizeHandler.bind(this);
    }
    componentDidMount(){
        this.onResizeHandler();
        window.addEventListener('resize', this.onResizeHandler)
        model.addStateChangeListener(this.renderFigures);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.onResizeHandler)
        model.removeStateChangeListener(this.renderFigures);
    }
    onResizeHandler(){
        this.setSize();
        this.renderDesk();
        this.renderFigures();
    }
    setSize(){
        let size;
        if (window.innerHeight > window.innerWidth){
            size = window.innerWidth;
        }
        else{
            size = window.innerHeight
        }
        this.gf.width = size;
        this.gf.height = size;
    }
    renderDesk(){
        const state = model.getState();
        const context = this.gf.getContext('2d');
        const scale = $(this.gf).innerWidth() / 10;
        for (let i = 0; i < state.length; i++)
            for (let j = 0; j < state[i].length; j++){
                context.fillStyle = (i + j) % 2 === 0 ? '#a3b7ce' : '#193351';
                context.fillRect(i * scale, j * scale, scale, scale);
            }
        context.save();
    }
    renderFigures(){
        const state = model.getState();
        const context = this.gf.getContext('2d');
        context.restore();
        const scale = $(this.gf).innerWidth() / 10;
        for (let i = 0; i < state.length; i++)
            for (let j = 0; j < state[i].length; j++){
                if (state[i][j]){
                    const img = new Image();
                    img.src = state[i][j].img;
                    img.width = img.height = scale + 'px';
                    img.onload = function(){
                        context.drawImage(img, i * scale, j * scale);
                    }
                }               
            }
    }
    render(){
        return (
            <div className="game-field">
                <canvas ref={el => this.gf = el}></canvas>
            </div>
        )
    }
}
export default Gamefield;