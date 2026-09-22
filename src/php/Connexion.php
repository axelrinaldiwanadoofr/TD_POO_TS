<?php
	/** 
    * Classe d'accès aux données de type singleton
    * qui utilise les services de la classe PDO
    */

   class Connexion
   {   	
	    //Attribut statique
        private static PDO | null $connexion = null ;

        /**
        * Méthode statique qui renvoie l'unique instance de Connexion
        **/
        public static function getInstance()
        {
            if(!self::$connexion)
            {
                $serveur = 'mysql:host=localhost:3306;';
                $bdd = 'dbname=dessins';   		
                $user = 'root' ; 
                $mdp = 'root' ;

                try 
                {

                    self::$connexion = new PDO($serveur.$bdd, $user, $mdp); 
                    self::$connexion->query("SET CHARACTER SET utf8");
                } catch (PDOException $e) 
                {
                        echo " Error connexion: " . $serveur . " " . $bdd . " " . $user . " " . $mdp . " " . $e->getMessage() ;
                        throw new Exception("Erreur à  la connexion \n" . $e->getMessage());
                }
            }
            return self::$connexion;
        }
    }   
?>