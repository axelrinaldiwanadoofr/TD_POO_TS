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
    protected shadow: ShadowRoot | null = null ;
    protected canvas : HTMLCanvasElement | null = null ;

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
        let choixCouleur = this.shadow?.querySelector( "#choixCouleur") as HTMLInputElement ;
        let choixFigure = this.shadow?.querySelector( "#choixFigure") as HTMLSelectElement ;

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
        let largeur = this.getAttribute( "largeur" ) ;
        let hauteur = this.getAttribute( "hauteur" ) ;

        let reponseHttp = await fetch( "../src/VwDessin.html" ) ;
        let html = await reponseHttp.text() ;

        if( largeur ) html = html.replace( "largeur", largeur ) ;
        else html = html.replace( "largeur", "300" ) ;

        if( hauteur ) html = html.replace( "hauteur", hauteur ) ;
        else html = html.replace( "hauteur", "150" ) ;

        this.shadow = this.attachShadow({ mode: "open" });        

        reponseHttp = await fetch( "../src/VwDessin.css" ) ;
        let sheetText = await reponseHttp.text() ;

        const sheet = new CSSStyleSheet();
        sheet.replaceSync( sheetText ) ;
        this.shadow.adoptedStyleSheets.push( sheet ) ; 

        this.shadow.innerHTML = html ;

        this.canvas = this.shadow.querySelector( "canvas") as HTMLCanvasElement ;

        if( this.canvas )
        {   
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
        if( this.canvas && this.dessin )
        {
            let stylo = this.canvas.getContext( "2d" ) ;
            stylo?.clearRect( 0, 0, this._largeur, this._hauteur )
            this.dessin?.dessiner( stylo ) ;
        }        
    }    
}

