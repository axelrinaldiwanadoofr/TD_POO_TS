import {Point} from "./Point" ;
import { Clonable } from "./FabriqueClone";

export class Figure implements Clonable<Figure>
{
    protected id: number = 0 ;
    protected _couleur: string = "black" ;
    protected _epaisseur: number = 3 ;

    constructor( id: number, couleur: string = "black", epaisseur: number = 3 )
    {
        this.id = id ;
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

    public setFromData( data: Map<string,any> ): void
    {       
        this.id = data["id"] as number ;
        this.couleur = data["couleur"] as string ;
        this.epaisseur = data["epaisseur"] as number ;
    }

    public cloner(): Figure
    {
        return new Figure( this.id, this.couleur, this.epaisseur ) ;
    }

}