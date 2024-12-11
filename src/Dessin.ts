
import {FgPoint } from "./FgPoint";
import {Figure} from "./Figure" ;

export class Dessin
{
    protected figures: Array<Figure> ;

    constructor()
    {
        this.figures = new Array<Figure>() ;
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
}