
import {Figure} from "./Figure" ;

export class FgSegment extends Figure
{
    protected x1: number ;
    protected y1: number ;
    protected x2: number ;
    protected y2: number ;

    constructor( x1: number, y1: number, x2: number, y2: number, couleur: string="#000000", largeur: number = 3 )
    {
        super( couleur, largeur ) ;

        this.x1 = x1 ;
        this.y1 = y1 ;
        this.x2 = x2 ;
        this.y2 = y2 ;
    }

    public dessiner(ctx: CanvasRenderingContext2D): void 
    {
        ctx.beginPath() ;
        ctx.moveTo( this.x1, this.y1 ) ;
        ctx.lineTo( this.x2, this.y2 ) ;
        ctx.strokeStyle = this._couleur ;
        ctx.lineWidth = this._epaisseur ;
        ctx.stroke();        
    }

    public definirPointParPoint( xm: number, ym: number, numPoint: number): boolean 
    {
        if( numPoint == 1 )
        {
            this.x1 = xm ;
            this.y1 = ym ;
            this.x2 = xm ;
            this.y2 = ym ;
            return false ;
        }    
        else if( numPoint == 2 )
        {
            this.x2 = xm ;
            this.y2 = ym ;
            return true ;
        }    
        return true ;
    }

    public cloner(): Figure
    {
        return new FgSegment( this.x1, this.y1, this.x2, this.y2, this._couleur, this._epaisseur ) ;
    }

}