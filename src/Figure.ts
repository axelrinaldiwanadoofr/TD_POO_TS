import {Point} from "./Point" ;
import { Clonable } from "./FabriqueClone";

export class Figure implements Clonable<Figure>
{
    protected _couleur: string = "black" ;
    protected _epaisseur: number = 3 ;

    constructor( couleur: string = "black", epaisseur: number = 3 )
    {
        this.couleur = couleur ;
        this.epaisseur = epaisseur ;
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

    public get epaisseur()
    {
        return this._epaisseur ;
    }

    public set epaisseur( valeur: number )
    {
        this._epaisseur = valeur ;
    }

    public dessiner( ctx: CanvasRenderingContext2D ): void
    {
    }

    public definirPointParPoint( xm: number, ym: number, numPoint: number): boolean 
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