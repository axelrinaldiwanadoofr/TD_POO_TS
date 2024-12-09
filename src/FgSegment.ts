
import {Figure} from "./Figure" ;
import {Point} from "./Point" ;
import {SQL} from "./SQL" ;

export class FgSegment extends Figure
{
    protected point1: Point ;
    protected point2: Point ;
    protected couleur: string ;

    constructor( point1: Point= new Point(0,0), point2: Point= new Point(0,0), couleur: string="#000000" )
    {
        super() ;

        this.point1 = point1 ;
        this.point2 = point2 ;
        this.couleur = couleur ;
    }

    public dessiner(ctx: CanvasRenderingContext2D): void 
    {
        ctx.beginPath() ;
        ctx.strokeStyle = this.couleur ;
        ctx.moveTo( this.point1.x, this.point1.y ) ;
        ctx.lineTo( this.point2.x, this.point2.y ) ;
        ctx.stroke() ;
    }

    public setByClick(souri: Point, numClick: number): boolean 
    {
        if( numClick == 1 )
        {
            this.point1 = souri ;
            this.point2 = souri ;
            return false ;
        }    
        if( numClick == 2 )
        {
            this.point2 = souri ;
        }    
        return true ;
    }

    public async save( idDessin: number ): Promise<void>
    {
        let r = parseInt( this.couleur.substring( 1, 3 ) , 16 ) ;
        let g = parseInt( this.couleur.substring( 3, 5 ), 16 ) ;
        let b = parseInt( this.couleur.substring( 5, 7 ), 16 ) ;

        let sql = "insert into figures( type, idDessin, V1, V2, V3, V4, V5, V6, V7 ) values( 'FgSegment',"
        + idDessin + "," + r + "," + g + "," + b + ","
        + this.point1.x + "," + this.point1.y + "," 
        + this.point2.x + "," + this.point2.y + ")" ;

        await SQL.exec( sql ) ;
    }

    public setFromData( data: Array<any> ): void
    {        
        let r = data["V1"].toString( 16 ) ;
        if( data["V1"] < 16 ) r = "0" + r ;
        let g = data["V2"].toString( 16 ) ;
        if( data["V2"] < 16 ) g = "0" + g ;
        let b = data["V3"].toString( 16 ) ;
        if( data["V3"] < 16 ) b = "0" + b ;

        this.couleur = "#" + r + g + b ;
        this.point1.x = data["V4"] ;
        this.point1.y = data["V5"] ;
        this.point2.x = data["V6"] ;
        this.point2.y = data["V7"] ;
    }

}