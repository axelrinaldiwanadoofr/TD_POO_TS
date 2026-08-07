import {Test} from "./Test"
import {Dessin} from "./Dessin" ;
import { VwDessin } from "./VwDessin";


customElements.define( "vw-dessin", VwDessin ) ;

setTimeout( ()=> 
{
    let message: Test ;
    message = new Test( "coucou") ;
    message.afficheMessage() ;

    /*
    // Figure courante
    let figureCourante: Figure | null = null ;
    // Compteur de click
    let compteurDeClick = 0 ;



    let canvas = document.querySelector( "canvas") as HTMLCanvasElement ;
    let ctx = canvas.getContext( "2d" ) ;

    canvas.addEventListener( "click", (event)=>
    {
        if( !figureCourante )
        {
            figureCourante = creeFigure( dessin ) ;
        }

        if( figureCourante )
        {
            compteurDeClick++ ;
            // On crée un point à partir des coordonnées de la souri
            let souri: Point = new Point( event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop ) ;

            if( figureCourante.setByClick( souri, compteurDeClick) )
            {
                figureCourante = null ;
                compteurDeClick = 0 ;
            }
        }

        ctx?.clearRect( 0, 0, 800, 600 )
        dessin.dessiner( ctx ) ;
    });

    // On créer un dessin vide
    let dessin = new Dessin() ;

    // On le dessin
    dessin.dessiner( ctx ) ;
    */
}, 500 ) ;

// Test divers
/*
async function execSQL()
{
    let data = await SQL.exec( "select * from dessins" ) ;

    console.log( data ) ;
}

execSQL() ;
*/

/*
dessin.deleteOldData() ;
*/



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