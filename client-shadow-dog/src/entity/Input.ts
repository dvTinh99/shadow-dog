export default class InputHandler {
    lastKey : string
    constructor() {
        this.lastKey = ''
        window.addEventListener('keydown', (e) => {
            console.log('e.key', e.key);
            
            switch(e.key) {
                case 'ArrowLeft' :
                    this.lastKey = 'PRESS LEFT'
                    break;
                case 'ArrowRight' :
                    this.lastKey = 'PRESS RIGHT'
                    break;
                case 'ArrowDown' :
                    this.lastKey = 'PRESS DOWN'
                    break;
                case 'ArrowUp' :
                    this.lastKey = 'PRESS UP'
                    break;
                case 'Enter' :
                    this.lastKey = 'PRESS ENTER'
                    break;
            }
        })
        window.addEventListener('keyup', (e) => {
            switch(e.key) {
                case 'ArrowLeft' :
                    this.lastKey = 'RELEASE LEFT'
                    break;
                case 'ArrowRight' :
                    this.lastKey = 'RELEASE RIGHT'
                    break;
                case 'ArrowDown' :
                    this.lastKey = 'RELEASE DOWN'
                    break;
                case 'ArrowUp' :
                    this.lastKey = 'RELEASE UP'
                    break;
            }
        })
    }
}