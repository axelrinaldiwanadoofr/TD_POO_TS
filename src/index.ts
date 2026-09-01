//import {Test} from "./Test"
import {Figure} from "./Figure" ;
import {FgPoint } from "./FgPoint";
import {FgSegment} from "./FgSegment" ;
import {IDessin} from "./IDessin" ;
import {Dessin} from "./Dessin" ;
//import { VwDessin } from "./VwDessin";


//customElements.define( "vw-dessin", VwDessin ) ;


setTimeout( ()=> 
{
    // Cree un dessin
    let dessin: IDessin = new Dessin() ;
    // Compteur de click
    let compteurDeClick = 0 ;

    let canvas = document.querySelector( "canvas") as HTMLCanvasElement ;
    let stylo = canvas.getContext( "2d" ) ;

    canvas.addEventListener( "click", (event)=>
    {
        if( !compteurDeClick )
        {
            let couleur = (document.getElementById( "choixCouleur" ) as HTMLInputElement).value ;
            let epaisseur = parseInt( (document.getElementById( "choixEpaisseur" ) as HTMLInputElement).value ) ;
            let nomType = (document.getElementById( "choixFigure" ) as HTMLSelectElement).value ;
            if( dessin.creerEtAjouterNouvelleFigure( nomType, couleur, epaisseur ) )
            {
               compteurDeClick++ ; 
            }
        }

        if( compteurDeClick )
        {
            // On calcule la position du point à partir des coordonnées de la souri
            let xm = event.clientX - canvas.offsetLeft ;
            let ym = event.clientY - canvas.offsetTop ;

            if( dessin.definirPointParPoint( xm, ym, compteurDeClick) ) compteurDeClick = 0 ;
            else compteurDeClick++ ;
        }

        stylo?.clearRect( 0, 0, 800, 600 )
        dessin.dessiner( stylo ) ;
    });
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

/*
let dessin = new Dessin() ;
dessin.ajoute( new FgPoint( 100, 100 ) ) ;
dessin.ajoute( new FgPoint( 150, 150 ) ) ;

//let canvas = document.getElementById( "ZoneDeDessin") as HTMLCanvasElement ;
//let stylo = canvas.getContext( "2d" ) ;

let canvas = document.getElementById( "ZoneDeDessin") ;
let stylo = (canvas as HTMLCanvasElement).getContext( "2d" ) ;

dessin.dessiner( stylo ) ;
*/