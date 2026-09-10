
export class Test
{
    protected message: string ;

    constructor( msg: string )
    {
        this.message = msg ;
    }

    public afficheMessage(): void
    {
        console.log( "Le message est: " + this.message ) ;
    }

    private toto(): void
    {
        let div = document.getElementById( "contenu" ) ;
        if( div ) div.innerHTML = this.message ;
    }

}

