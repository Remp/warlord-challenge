import React, {Component} from 'react';
import model from '../core/Model';
import $ from 'jquery';
import '../styles/Gamefield.css';

class Gamefield extends Component{
    constructor(){
        super();
        this.renderDesk = this.renderDesk.bind(this);
        this.renderFigures = this.renderFigures.bind(this);
        this.renderHints = this.renderHints.bind(this);
        this.onResizeHandler = this.onResizeHandler.bind(this);
    }
    componentDidMount(){
        this.onResizeHandler();
        window.addEventListener('resize', this.onResizeHandler)
        model.addFiguresChangeListener(this.renderFigures);
        model.addHintsChangeListener(this.renderHints);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.onResizeHandler)
        model.removeFiguresChangeListener(this.renderFigures);
        model.removeHintsChangeListener(this.renderHints);
    }
    onResizeHandler(){
        this.setSize();
        this.renderDesk();
        this.renderFigures();
        this.renderHints();
    }
    onClickHandler(e){
        const x = Math.floor(e.offsetX / ($(this.gf).innerWidth() / 10))
        const y = Math.floor(e.offsetY / ($(this.gf).innerWidth() / 10))
        model.selectField(x, y)
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
        const size = model.getSize();
        const context = this.gf.getContext('2d');
        const scale = $(this.gf).innerWidth() / 10;
        for (let i = 0; i < size.w; i++)
            for (let j = 0; j < size.h; j++){
                context.fillStyle = (i + j) % 2 === 0 ? '#a3b7ce' : '#193351';
                context.fillRect(i * scale, j * scale, scale, scale);
            }
        context.save();
    }
    renderFigures(){
        const scale = $(this.gf).innerWidth() / 10;
        const figures = model.getFigures();
        for (let i = 0; i < figures.length; i++){
            const img = new Image();
            img.src = figures[i].img;
            img.width = img.height = scale + 'px';
            img.onload = function(){
                context.drawImage(img, figures[i].x * scale, figures[i].y * scale);
            }
        }
    }
    renderHints(){
        const scale = $(this.gf).innerWidth() / 10;
        const hints = model.getHints();
        for (let i = 0; i < hints.length; i++){
            const img = new Image();
            img.src = figures[i].img;
            img.width = img.height = scale + 'px';
            img.onload = function(){
                context.drawImage(img, hints[i].x * scale, hints[i].y * scale);
            }
        }            
    }
    render(){
        return (
            <div className="game-field">
                <canvas onClick={e => this.onClickHandler(e)} ref={el => this.gf = el}></canvas>
            </div>
        )
    }
}
export default Gamefield;