<?php

$sql = $_GET["sql"] ;

$host = '127.0.0.1';
$port = 3306 ;
$db   = 'dessin2d';
$user = 'root';
$pass = 'root';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";

$pdo = new PDO($dsn, $user, $pass );

$curseur = $pdo->query( $sql ) ;

$resultat = $curseur->fetchAll( PDO::FETCH_ASSOC ) ;

echo json_encode( $resultat ) ;

?>