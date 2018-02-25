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
        const x = Math.floor(e.clientX / ($(this.gf).innerWidth() / 10))
        const y = Math.floor(e.clientY / ($(this.gf).innerWidth() / 10))
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
        this.gf.width = this.gf.height = size;
        this.gfF.width = this.gfF.height = size;
        this.gfH.width = this.gfH.height = size;
        this.scale = size / 10;
    }
    renderDesk(){
        const size = model.getFieldSize();
        this.context = this.gf.getContext('2d');
        for (let i = 0; i < size.w; i++)
            for (let j = 0; j < size.h; j++){
                this.context.fillStyle = (i + j) % 2 === 0 ? '#a3b7ce' : '#193351';
                this.context.fillRect(i * this.scale, j * this.scale, this.scale, this.scale);
            }
    }
    renderFigures(){
        const figures = model.getFigures();
        const context = this.gfF.getContext('2d');
        context.clearRect(0, 0, this.gfF.width, this.gfF.height);
        for (let i = 0; i < figures.length; i++){
            const img = new Image();
            img.src = figures[i].img;
            img.onload = () => {
                context.drawImage(img, figures[i].x * this.scale, figures[i].y * this.scale, this.scale, this.scale);
            }
        }
    }
    renderHints(){
        const hints = model.getHints();
        const context = this.gfH.getContext('2d');
        context.clearRect(0, 0, this.gfH.width, this.gfH.height);
        for (let i = 0; i < hints.length; i++){
            const img = new Image();
            img.src = hints[i].img;
            img.onload = () => {
                context.drawImage(img, hints[i].x * this.scale, hints[i].y * this.scale, this.scale, this.scale);
            }
        }  
    }
    render(){
        return (
            <div onClick={e => this.onClickHandler(e)} className="game-field">
                <canvas ref={el => this.gf = el}></canvas>
                <canvas ref={el => this.gfF = el}></canvas>
                <canvas ref={el => this.gfH = el}></canvas>
            </div>
        )
    }
}
export default Gamefield;