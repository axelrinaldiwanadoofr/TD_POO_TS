class Test
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

    }

}

let message: Test ;
message = new Test( "coucou") ;
message.afficheMessage() ;
