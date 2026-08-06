
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

    _updateRendering() 
    {
        // Left as an exercise for the reader. But, you'll probably want to
        // check this.ownerDocument.defaultView to see if we've been
        // inserted into a document with a browsing context, and avoid
        // doing any work if not.
    }    
}

