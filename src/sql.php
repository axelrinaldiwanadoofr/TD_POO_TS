<?php

// toto

//$sql = $_GET["sql"] ;
$sql = $_POST["sql"] ;

$host = '127.0.0.1';
$port = 3306 ;
$db   = 'dessin2d';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";

$pdo = new PDO($dsn, $user, $pass );

$curseur = $pdo->query( $sql ) ;

$resultat = $curseur->fetchAll( PDO::FETCH_ASSOC ) ;

echo json_encode( $resultat ) ;

?>