const w : number = window.innerWidth 
const h : number = window.innerHeight
const parts : number = 3
const scGap : number = 0.02 / parts  
const strokeFactor : number = 90 
const backColor : string = "#bdbdbd"
const colors : Array<string> = [
    "#1abc9c",
    "#2980b9",
    "#2ecc71",
    "#8e44ad",
    "#c0392b"
]
const delay : number = 20 

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number, i : number, n : number) : number {
        return Math.sin(scale * Math.PI)
    }
}