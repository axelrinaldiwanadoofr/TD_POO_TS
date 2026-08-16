<?php 
require_once 'Connexion.php' ;
require_once 'Route.php' ;    
require_once 'RestReponse.php' ;    
require_once 'RouteSQL.php' ;

class RouteSqlInsert extends RouteSQL
{
    protected string $sqlInitialValues = "" ;

    public function __construct( string $chemin, string $sql, string $sqlInitialValues, string $translate )
    {
        parent::__construct( $chemin, "PUT", $sql, $translate ) ;
        $this->sqlInitialValues = $sqlInitialValues ;
    }

    public function run( RestRequest $request, Array $params )
    {
        $data = array() ;
        $db = Connexion::getInstance() ;

        if( $this->sqlInitialValues != "" )
        {
            $sth = $db->prepare( $this->sqlInitialValues, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
            try
            {
                $sth->execute() ;
                $initialValues = $sth->fetch( PDO::FETCH_ASSOC ) ;

            }
            catch( PDOException $e )
            {
                return new RestReponse( Array(), "RouteSqlInsert->run: ". $this->sqlInitialValues . " " . $e->getMessage() ) ;
            }
        }

        $sql = $this->sql ;

        $sth = $db->prepare( $sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
        foreach( $_POST as $param => $value )
        {
            $sth->bindValue( $param, $value, PDO::PARAM_STR) ;
            $data[$param] = $value ;
        }

        foreach( $initialValues as $param => $value )
        {
            $sth->bindValue( $param, $value ) ;
            $data[$param] = $value ;
        }

        try
        {
            $sth->execute() ;

            // Retourne les valeurs du nouvel enregistrement
            return new RestReponse( $data, "" ) ;
        }
        catch( PDOException $e )
        {
            return new RestReponse( Array(), "RouteSqlInsert->run: ". $sql . " " .$e->getMessage() ) ;
        }
    }   
}





?>