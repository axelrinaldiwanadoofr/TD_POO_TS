import {Point} from "./Point" ;
import { Clonable } from "./FabriqueClone";

export class Figure implements Clonable<Figure>
{
    protected _couleur: string = "black" ;
    protected _largeur: number = 3 ;

    constructor( couleur: string = "black", largeur: number = 3 )
    {
        this.couleur = couleur ;
        this.largeur = largeur ;
    }

    public get couleur(): string
    {
        return this._couleur ;
    }

    public set couleur( nom: string )
    {
        this._couleur = nom ;
    }

    public setCouleurRGB( rouge: string, vert: string, bleu: string )
    {
        this._couleur = "#" + rouge + vert + bleu ;
    }

    public get largeur()
    {
        return this._largeur ;
    }

    public set largeur( valeur: number )
    {
        this._largeur = valeur ;
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

    public cloner(): Figure
    {
        return new Figure() ;
    }

}