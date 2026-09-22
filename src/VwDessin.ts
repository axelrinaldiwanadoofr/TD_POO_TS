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
        Dessin.ajouterModele( "Point", new FgPoint( 0, 0, 0 ) ) ;
        Dessin.ajouterModele( "Segment", new FgSegment( 0, 0, 0, 0, 0 ) ) ;
        
    }

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
                let choixCouleur = this.shadow?.querySelector( "#choixCouleur") as HTMLInputElement ;
                let choixFigure = this.shadow?.querySelector( "#choixFigure") as HTMLSelectElement ;
                let choixEpaisseur = this.shadow?.querySelector( "#choixEpaisseur") as HTMLSelectElement ;

                if( this.dessin )
                {
                    if( !this.compteurDeClick )
                    {
                        if( this.dessin.creerEtAjouterNouvelleFigure( choixFigure.value, choixCouleur.value, parseInt(choixEpaisseur.value) ) )
                        {
                            this.compteurDeClick++ ;
                        }
                    }
                    if( this.compteurDeClick )
                    {
                        if( this.dessin.definirPointParPoint( event.offsetX, event.offsetY, this.compteurDeClick++) ) 
                        {
                            this.compteurDeClick = 0 ;
                        }    
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

