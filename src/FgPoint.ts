
import {Figure} from "./Figure" ;
import {Point} from "./Point" ;
import {SQL} from "./SQL" ;

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

    public async save( idDessin: number ): Promise<void>
    {
        let r = parseInt( this.couleur.substring( 1, 3 ) , 16 ) ;
        let g = parseInt( this.couleur.substring( 3, 5 ), 16 ) ;
        let b = parseInt( this.couleur.substring( 5, 7 ), 16 ) ;

        let sql = "insert into figures( type, idDessin, V1, V2, V3, V4, V5 ) values( 'FgPoint',"
        + idDessin + "," + r + "," + g + "," + b + ","
        + this.point.x + "," + this.point.y + ")" ;

        await SQL.exec( sql ) ;
    }

    public setFromData( data: Array<any> ): void
    {        
        let r = data["V1"].toString( 16 ) ;
        let g = data["V2"].toString( 16 ) ;
        let b = data["V3"].toString( 16 ) ;
        this.couleur = "#" + r + g + b ;
        this.point.x = data["V4"] ;
        this.point.y = data["V5"] ;
    }

}