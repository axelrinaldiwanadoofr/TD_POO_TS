
import {Figure} from "./Figure" ;
import {Point} from "./Point" ;
import {SQL} from "./SQL" ;
import { FgSegment } from "./FgSegment";

export class FgRectangle extends FgSegment
{

    constructor( point1: Point= new Point(0,0), point2: Point= new Point(0,0), couleur: string="#000000" )
    {
        super( point1, point2, couleur ) ;
    }

    public dessiner(ctx: CanvasRenderingContext2D): void 
    {
        ctx.beginPath() ;
        ctx.strokeStyle = this.couleur ;
        ctx.moveTo( this.point1.x, this.point1.y ) ;
        ctx.lineTo( this.point2.x, this.point1.y ) ;
        ctx.lineTo( this.point2.x, this.point2.y ) ;
        ctx.lineTo( this.point1.x, this.point2.y ) ;
        ctx.lineTo( this.point1.x, this.point1.y ) ;
        ctx.stroke() ;
    }

    public async save( idDessin: number ): Promise<void>
    {
        let r = parseInt( this.couleur.substring( 1, 3 ) , 16 ) ;
        let g = parseInt( this.couleur.substring( 3, 5 ), 16 ) ;
        let b = parseInt( this.couleur.substring( 5, 7 ), 16 ) ;

        let sql = "insert into figures( type, idDessin, V1, V2, V3, V4, V5, V6, V7 ) values( 'FgRectangle',"
        + idDessin + "," + r + "," + g + "," + b + ","
        + this.point1.x + "," + this.point1.y + "," 
        + this.point2.x + "," + this.point2.y + ")" ;

        await SQL.exec( sql ) ;
    }
}