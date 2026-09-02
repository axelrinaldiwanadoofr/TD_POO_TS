import {Figure} from "./Figure" ;
import {IDessin} from "./IDessin" ;

export class Dessin implements IDessin
{
    protected   figures: Array<Figure> ;

    protected static modeles: Map<string,Figure> = new Map<string,Figure>() ;

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

    public definirPointParPoint( x: number, y: number, numClic: number ): boolean
    {
        let derniereFigure = this.figures.at( -1 ) ;
        if( derniereFigure ) return derniereFigure.definirPointParPoint( x, y, numClic ) ;
        return true ;
    }

    public creerEtAjouterNouvelleFigure( nomType : string, couleur : string, epaisseur : number) : boolean
    {
        let figure = Dessin.creerFigure( nomType ) ;
        if( figure )
        {
            this.figures.push( figure ) ;
            return true ;
        }
        return false ;
    }

    public static ajouterModele( nomType: string, modele: Figure ): void
    {
        Dessin.modeles.set( nomType, modele ) ;
    }

    public static creerFigure( nomType: string ): Figure | null
    {
        let modele =  Dessin.modeles.get( nomType ) ;
        if( modele ) return modele.cloner() ;
        return null ;
    }
}