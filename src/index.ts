import {Test} from "./Test"

let message: Test ;
message = new Test( "coucou") ;
message.afficheMessage() ;

let canvas = document.querySelector( "canvas") ;
let ctx = canvas.getContext( "2d" ) ;

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
