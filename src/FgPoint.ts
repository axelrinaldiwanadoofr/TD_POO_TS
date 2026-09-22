
import {Point} from "./Point" ;
import {Figure} from "./Figure" ;

export class FgPoint extends Figure
{
    protected x: number = 0 ;
    protected y: number = 0 ;

    constructor( id: number, x: number, y: number, couleur: string="#000000", epaisseur: number = 3 )
    {
        super( id, couleur, epaisseur ) ;

        this.x = x ;
        this.y = y ;
    }

    public dessiner( stylo: CanvasRenderingContext2D): void 
    {
        stylo.beginPath() ;
        stylo.arc( this.x, this.y, this._epaisseur, 0, Math.PI*2 ) ;
        stylo.fillStyle = this._couleur ;
        stylo.fill() ;
    }

    public definirPointParPoint( xm: number, ym: number, numPoint: number): boolean 
    {
        if( numPoint == 1 )
        {
            this.x = xm ;
            this.y = ym ;
        }    
        return true ;
    }

    public setFromData( data: Map<string,any> ): void
    {
        super.setFromData( data ) ;
        this.x = data["x1"] as number ;
        this.y = data["y1"] as number ;
    }


    public cloner(): Figure
    {
        return new FgPoint( this.id, this.x, this.y, this._couleur, this._epaisseur ) ;
    }

}