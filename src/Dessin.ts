
import {Figure} from "./Figure" ;

export class Dessin
{
    protected   figures: Array<Figure> ;
    static      modeles: Map<string,Figure> ;

    constructor()
    {
        this.figures = new Array<Figure>() ;
    }

    public ajoute( f: Figure ): void
    {
        this.figures.push( f ) ;
    }

    public dessiner( ctx: CanvasRenderingContext2D | null ): void
    {
        if( ctx )
        {
            for( let i=0; i<this.figures.length; i++ )
            {
                this.figures[i].dessiner( ctx ) ;
            }
        }
    }

    public static ajouteModele( nom: string, modele: Figure ): void
    {
        Dessin.modeles.set( nom, modele ) ;
    }

    public static creeFigure( nom: string ): Figure | null
    {
        let modele = Dessin.modeles.get( nom ) ;
        if( modele ) return modele.cloner() ;
        return null ;
    }
}