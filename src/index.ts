import {Test} from "./Test"
import {Figure} from "./Figure" ;
import {Point} from "./Point" ;
import {Dessin} from "./Dessin" ;
import {FgPoint} from "./FgPoint" ;

let message: Test ;
message = new Test( "coucou") ;
message.afficheMessage() ;

let canvas = document.querySelector( "canvas") ;
let ctx = canvas.getContext( "2d" ) ;

// On créer un dessin vide
let dessin = new Dessin() ;

// On crée et ajoute une figure de point dans le dessin
let point = new FgPoint( new Point( 50,100), "#FF0000" ) ;
dessin.ajoute( point ) ;

// On crée et ajoute une figure de point dans le dessin
dessin.ajoute( new FgPoint( new Point( 100, 120), "#00FF00") ) ;

// On le dessin
dessin.dessiner( ctx ) ;





/*
//ctx.rotate( Math.PI/2 ) ;
//ctx.translate( 100, 100 ) ;
//ctx.rotate( Math.PI/2 ) ;

// Dessin d'un rectangle colorié en bleu ciel
ctx.fillStyle = "#00FFF0" ;
ctx.fillRect( 0, 0, 100, 50 ) ;

// Dessin d'une droite
ctx.strokeStyle = "red" ;

ctx.beginPath() ;
ctx.moveTo( 100, 100 ) ;
ctx.lineTo( 200, 180 ) ;
ctx.lineTo( 200, 80 ) ;
ctx.stroke() ;

// Translation du repère d'axes
ctx.translate( 200, 150 ) ;

// Dessin d'un rectangle colorié en bleu ciel
ctx.fillStyle = "#0FFFF0" ;
ctx.fillRect( 0, 0, 100, 50 ) ;

// Translation du repère d'axes
ctx.rotate( Math.PI/4 ) ;

// Dessin d'un rectangle colorié en bleu ciel
ctx.fillStyle = "#F0FF00" ;
ctx.fillRect( 0, 0, 100, 50 ) ;
*/