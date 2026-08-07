
import {Figure} from "./Figure" ;
import {Point} from "./Point" ;

export class FgPoint extends Figure
{
    protected point: Point ;

    constructor( point: Point= new Point(0,0), couleur: string="#000000", largeur: number = 3 )
    {
        super( couleur, largeur ) ;

        this.point = point ;
    }

    public dessiner(ctx: CanvasRenderingContext2D): void 
    {
        ctx.beginPath() ;
        ctx.arc( this.point.x, this.point.y, this._largeur, 0, Math.PI*2 ) ;
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

    public cloner(): Figure
    {
        return new FgPoint( this.point, this._couleur, this._largeur ) ;
    }

}