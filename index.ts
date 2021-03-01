const w : number = window.innerWidth 
const h : number = window.innerHeight
const parts : number = 3
const scGap : number = 0.02 / parts  
const strokeFactor : number = 90 
const backColor : string = "#bdbdbd"
const sizeFactor : number = 2.9 
const colors : Array<string> = [
    "#1abc9c",
    "#2980b9",
    "#2ecc71",
    "#8e44ad",
    "#c0392b"
]
const delay : number = 20 
const gapFactor : number = 8.9 

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }
    
    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r, 0, 2 * Math.PI)
        context.fill()
    }

    static drawCirclePauseBtn(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / sizeFactor 
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number  = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const gap : number = size / gapFactor 
        context.save()
        context.translate(w / 2, h / 2)
        context.globalAlpha = 1 - sf3 
        for (var j = 0; j < 2; j++) {
            context.save()
            context.translate(-gap / 2 + gap * j, 0)
            DrawingUtil.drawLine(context, 0, -size * sf2 * 0.66, 0, size * sf2 * 0.66)
            context.restore()
        }
        DrawingUtil.drawCircle(context, 0, 0, size * sf1)
        context.restore()
        context.globalAlpha = 1
    }

    static drawCPBNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = 'white'
        context.fillStyle = colors[i]
        DrawingUtil.drawCirclePauseBtn(context, scale)
    }
}

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D 

    initCanvas() {
        this.canvas.width = w 
        this.canvas.height = h 
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas) 
    }

    render() {
        this.context.fillStyle = backColor 
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : Stage = new Stage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}