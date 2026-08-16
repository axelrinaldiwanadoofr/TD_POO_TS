<?php 

class Routeur
{
    protected Array $routes = [];
    protected Array $currentParams = Array() ;
    protected RestRequest | null $currentRequest = null ;

    public function __construct()
    {
    }

    public function addRoute( Route $route ) : void
    {
        array_push( $this->routes, $route ) ; 
    }

    public function find( RestRequest $request ) : Route | null
    {
        foreach( $this->routes as $route )
        {
            $params = $route->match( $request ) ;
            if( $params !== null )
            {
                $this->currentParams = $params ;
                $this->currentRequest = $request ;
                return $route ;
            }
        }
        return null ;
    }

    public function run( Route $route ) : RestReponse
    {
        if( $route )
        {
            return $route->run( $this->currentRequest, $this->currentParams ) ;
        }
        return new RestReponse( Array(), "Pas de route en cours" ) ;
    }
}


?>