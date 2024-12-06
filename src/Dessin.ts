
import {FgPoint } from "./FgPoint";
import { FgSegment } from "./FgSegment";
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

    public async save(): Promise<void>
    {
        await this.deleteOldData() ;

        let sql = "insert into dessins( nom ) values( '" + this._nom + "')" ;

        await SQL.exec( sql ) ;
        let dataId = await SQL.exec( "select id from dessins where nom='" + this._nom + "'" ) ;

        if( dataId.length > 0 )
        {
            for( let i=0; i<this.figures.length; i++ )
            {
                await this.figures[i].save( dataId[0]["id"] ) ;
            }    
        }
    }

    public async load( nom: string ): Promise<void>
    {
        let dataDessin = await SQL.exec( "select id, nom from dessins where nom='" + nom + "'" ) ;

        if( dataDessin.length > 0 )
        {
            this.nom = dataDessin[0]["nom"] ;

            let dataFigures = await SQL.exec( "select * from figures where idDessin=" + dataDessin[0]["id"] ) ;
            for( let i=0; i<dataFigures.length; i++ )
            {
                let figure = null ;
                if( dataFigures[i]["type"] == "FgPoint" ) figure = new FgPoint() ;
                if( dataFigures[i]["type"] == "FgSegment" ) figure = new FgSegment() ;

                if( figure )
                {
                    figure.setFromData( dataFigures[i] ) ;
                    this.ajoute( figure ) ;
                }
            }    
        }
    }
}