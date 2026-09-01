import {IDessin} from "./IDessin" ;
import {Figure} from "./Figure" ;
import {FgPoint} from "./FgPoint";
import {FgSegment } from "./FgSegment";

export class Dessin implements IDessin
{
    protected   figures: Array<Figure> ;

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
        if( nomType == "point" )
        {
            this.ajoute( new FgPoint( 0, 0, couleur, epaisseur ) ) ;
            return true ;
        }
        else if( nomType == "segment" )
        {
            this.ajoute( new FgSegment( 0, 0, 0, 0, couleur, epaisseur )) ;
            return true ;
        }
        return false ;
    }

}