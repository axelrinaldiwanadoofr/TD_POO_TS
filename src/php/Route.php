<?php 
require_once 'RestRequest.php' ;    
require_once 'RestReponse.php' ;    


class Route
{
    protected string $chemin ;
    protected string $method ;

    public function __construct( string $chemin, string $method)
    {
        $this->chemin = $chemin ;
        $this->method = $method ;
    }

    public function match( RestRequest $request )
    {
        if( $this->method === $request->method )
        {
            return $this->parse( $request->chemin ) ;
        }
        return null ;
    }

    public function parse( string $chemin)
    {
        $params = [] ;
        $morceauxRoute = explode( '/', $this->chemin ) ;
        $morceauxChemin = explode( '/', $chemin ) ;

        if( count( $morceauxRoute ) != count( $morceauxChemin ) )
        {
            return null ;
        }

        for( $i=0 ; $i < count( $morceauxRoute ) ; $i++ )
        {
            if( strpos( $morceauxRoute[$i], ':' ) === 0 )
            {
                $nomParam = substr( $morceauxRoute[$i], 1 ) ;
                $params[ $nomParam ] = $morceauxChemin[$i] ;
            }
            else
            {
                if( $morceauxRoute[$i] != $morceauxChemin[$i] )
                {
                    return null ;
                }
            }
        }
        return $params ;
    }

    public function run( RestRequest $request, Array $params )
    {
        $data = [ 
            "route" => $this->chemin, 
            "method" => $this->method, 
            "params" => $params ] ;
            
        return new RestReponse( $data, "" ) ;
    }   

}
?>