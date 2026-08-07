
import {Figure} from "./Figure" ;
import {Point} from "./Point" ;

export class FgSegment extends Figure
{
    protected point0: Point ;
    protected point1: Point ;

    constructor( point0: Point= new Point(0,0), point1: Point= new Point(0,0),  couleur: string="#000000", largeur: number = 3 )
    {
        super( couleur, largeur ) ;

        this.point0 = point0 ;
        this.point1 = point1 ;
    }

    public dessiner(ctx: CanvasRenderingContext2D): void 
    {
        ctx.beginPath() ;
        ctx.moveTo( this.point0.x, this.point0.y ) ;
        ctx.lineTo( this.point1.x, this.point1.y ) ;
        ctx.strokeStyle = this._couleur ;
        ctx.lineWidth = this._largeur ;
        ctx.stroke();        
    }

    public setByClick(souri: Point, numClick: number): boolean 
    {
        if( numClick == 1 )
        {
            this.point0 = souri ;
            this.point1 = souri ;
            return false ;
        }    
        else if( numClick == 2 )
        {
            this.point1 = souri ;
            return true ;
        }    
        return true ;
    }

    public cloner(): Figure
    {
        return new FgSegment( this.point0, this.point1, this._couleur, this._largeur ) ;
    }

}