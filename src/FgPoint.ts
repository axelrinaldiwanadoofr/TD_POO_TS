
import {Figure} from "./Figure" ;
import {Point} from "./Point" ;

export class FgPoint extends Figure
{
    protected point: Point ;
    protected couleur: string ;

    constructor( point: Point= new Point(0,0), couleur: string="#000000" )
    {
        super() ;

        this.point = point ;
        this.couleur = couleur ;
    }

    public dessiner(ctx: CanvasRenderingContext2D): void 
    {
        ctx.beginPath() ;
        ctx.arc( this.point.x, this.point.y, 3, 0, Math.PI*2 ) ;
        ctx.fillStyle = this.couleur ;
        ctx.fill() ;
    }

    public setByClick(souri: Point, numClick: number): boolean 
    {
        if( numClick == 1 )
        {
            this.point = souri ;
        }    
        return true ;
    }
}