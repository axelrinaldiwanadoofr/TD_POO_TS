import {Dessin} from "./Dessin" ;
import {Point} from "./Point" ;
import { FabriqueClone } from "./FabriqueClone";
import {Figure} from "./Figure" ;
import {FgPoint} from "./FgPoint" ;
import {FgSegment} from "./FgSegment" ;


export class VwDessin extends HTMLElement
{
    protected _largeur: number = 800 ;
    protected _hauteur: number = 600 ;

    protected dessin: Dessin | null = null ;
    protected fabrique: FabriqueClone<Figure> = new FabriqueClone<Figure>() ;

    // Figure courante et compteur de click
    protected figureCourante: Figure | null = null ;
    protected compteurDeClick = 0 ;

    protected canvas : HTMLCanvasElement | null = null ;
    protected stylo : CanvasRenderingContext2D | null = null ;


    constructor() 
    {
        super();

        // Crée un dessin vide
        this.dessin = new Dessin() ;

        // Ajout des modèles utilisables pour le dessin
        this.fabrique.ajouter( "point", new FgPoint( new Point(0, 0) ) ) ;
        this.fabrique.ajouter( "segment", new FgSegment( new Point(0, 0), new Point(0, 0) ) ) ;
    }

    public creeFigure(): Figure | null
    {
        let nouvelleFigure : Figure | null = null ;
        let choixCouleur = this.querySelector( "#choixCouleur") as HTMLInputElement ;
        let choixFigure = this.querySelector( "#choixFigure") as HTMLSelectElement ;

        nouvelleFigure = this.fabrique.clone( choixFigure.value ) as Figure ;

        if( nouvelleFigure && this.dessin )
        {
            nouvelleFigure.couleur = choixCouleur.value ;
            
            this.dessin.ajoute( nouvelleFigure ) ;
            return nouvelleFigure ;
        }
        return null ;
    } 


    //static observedAttributes = ["width"];

    attributeChangedCallback(name, oldValue, newValue)
    {
        if( name == "largeur" ) this._largeur = parseInt( newValue ) ;
        if( name == "hauteur" ) this._hauteur = parseInt( newValue ) ;

        this.updateRendering();
    }

    async connectedCallback() 
    {
        let reponseHttp = await fetch( "../src/VwDessin.html" ) ;
        let html = await reponseHttp.text() ;
        this.innerHTML = html ;

        this.canvas = this.querySelector( "canvas") as HTMLCanvasElement ;

        if( this.canvas )
        {   
            // Cree un outil de dessin 2D         
            this.stylo = this.canvas.getContext( "2d" ) ;

            this.canvas.addEventListener( "click", (event)=>
            {
                if( !this.figureCourante )
                {
                    this.figureCourante = this.creeFigure() ;
                }
        
                if( this.figureCourante && this.canvas )
                {
                    this.compteurDeClick++ ;

                    // On crée un point à partir des coordonnées de la souri
                    let souri: Point = new Point( event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop ) ;
        
                    if( this.figureCourante.setByClick( souri, this.compteurDeClick) )
                    {
                        this.figureCourante = null ;
                        this.compteurDeClick = 0 ;
                    }
                    this.updateRendering();
                }
            }) ;

        }

        this.updateRendering();
    }

    get largeur() {
        return this._largeur ;
    }

    set largeur(v : number )  
    {
        this._largeur = v ;
    }

    get hauteur() {
        return this._hauteur ;
    }

    set hauteur( v: number ) 
    {
        this._hauteur = v ;
    }

    public async updateRendering() : Promise<void>
    {
        if( this.stylo && this.dessin )
        {
            this.stylo?.clearRect( 0, 0, this._largeur, this._hauteur )
            this.dessin?.dessiner( this.stylo ) ;
        }        
    }    
}

