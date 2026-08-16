<?php 
require_once 'Connexion.php' ;
require_once 'RestRequest.php' ;
require_once 'Route.php' ;    
require_once 'RestReponse.php' ;    

class RouteSQL extends Route
{
    protected string $sql ;
    protected string $translate ;

    public function __construct( string $chemin, string $method, string $sql, string $translate )
    {
        parent::__construct( $chemin, $method ) ;
        $this->sql = $sql ;
        $this->translate = $translate ;
    }

    public function run( RestRequest $request, Array $params )
    {
        $index = 0 ;
        $count = 999999999 ;
        $db = Connexion::getInstance() ;

        $sql = $this->sql ;
        if( isset( $params["_index_"] ) &&  isset($params["_count_"]) )
        {
            $sql .= " limit " . $params["_count_"] . " offset " . $params["_index_"] ;
        }

        $sth = $db->prepare( $sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
        foreach( $params as $param => $value )
        {
            //if( $param == "_count_" ) $sth->bindParam( $param, $value, PDO::PARAM_INT ) ;
            //else if( $param == "_index_" ) $sth->bindParam( $param, $value, PDO::PARAM_INT ) ;
            if( $param != "_index_" && $param != "_count_" ) 
                $sth->bindParam( $param, $value ) ;
        }

        try
        {
            $sth->execute() ;

            $data = $sth->fetchAll( PDO::FETCH_ASSOC ) ;

            return new RestReponse( $data, "" ) ;
        }
        catch( PDOException $e )
        {
            return new RestReponse( Array(), $e->getMessage() ) ;
        }
    }   
}





?>