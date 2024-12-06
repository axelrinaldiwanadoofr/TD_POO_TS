import {Point} from "./Point" ;

export class Figure
{
    constructor()
    {

    }

    public dessiner( ctx: CanvasRenderingContext2D ): void
    {
    }

    public setByClick( souri: Point, numClick: number ): boolean
    {
        return true ;
    }

    public async save( idDessin: number ): Promise<void>
    {        
    }

    public setFromData( data: Array<any> ): void
    {        
    }

}