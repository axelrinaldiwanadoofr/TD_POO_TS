
export class VwDessin extends HTMLElement
{
    protected _largeur: number = 600 ;
    protected _hauteur: number = 400 ;

    constructor() 
    {
        super();
    }

    //static observedAttributes = ["width"];

    attributeChangedCallback(name, oldValue, newValue)
    {
        if( name == "largeur" ) this._largeur = parseInt( newValue ) ;
        if( name == "hauteur" ) this._hauteur = parseInt( newValue ) ;

        this._updateRendering();
    }

    connectedCallback() 
    {
        this._updateRendering();
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

    public async _updateRendering() : Promise<void>
    {
        let reponseHttp = await fetch( "../src/VwDessin.html" ) ;
        let html = await reponseHttp.text() ;
        this.innerHTML = html ;
    }    
}

