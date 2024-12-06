
import {Figure} from "./Figure" ;
import {SQL} from "./SQL" ;

export class Dessin
{
    protected figures: Array<Figure> ;
    protected _nom: string ;

    constructor( nom: string = "MonDessin" )
    {
        this._nom = nom ;
        this.figures = new Array<Figure>() ;
    }

    public get nom(): string
    {
        return this._nom ;
    }

    public set nom( valeur: string )
    {
        this._nom = valeur ;
    }

    public ajoute( f: Figure ): void
    {
        this.figures.push( f ) ;
    }

    public dessiner( ctx: CanvasRenderingContext2D ): void
    {
        for( let i=0; i<this.figures.length; i++ )
        {
            this.figures[i].dessiner( ctx ) ;
        }
    }

    public async deleteOldData(): Promise<void>
    {
        let dataId = await SQL.exec( "select id from dessins where nom='" + this._nom + "'" ) ;
        if( dataId.length > 0 )
        {
            await SQL.exec( "delete from figures where idDessin=" + dataId[0]["id"] ) ;
            await SQL.exec( "delete from dessins where id=" + dataId[0]["id"] ) ;
        }
    }
}