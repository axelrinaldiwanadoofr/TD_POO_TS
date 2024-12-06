import {Test} from "./Test"
import {Figure} from "./Figure" ;
import {Point} from "./Point" ;
import {Dessin} from "./Dessin" ;
import {FgPoint} from "./FgPoint" ;
import {SQL} from "./SQL" ;

let message: Test ;
message = new Test( "coucou") ;
message.afficheMessage() ;

// Figure courante
let figureCourante: Figure = null ;
// Compteur de click
let compteurDeClick = 0 ;

function creeFigure()
{
    if( choixFigure.value == "0" )
    {
        figureCourante = new FgPoint( new Point(0, 0), choixCouleur.value ) ;
        dessin.ajoute( figureCourante ) ;
        dessin.dessiner( ctx ) ;
    }
} 

let choixCouleur = document.querySelector( "#choixCouleur") as HTMLInputElement ;

let choixFigure = document.querySelector( "#choixFigure") as HTMLSelectElement ;


let canvas = document.querySelector( "canvas") ;
canvas.addEventListener( "click", (event)=>
{
    if( !figureCourante )
    {
        creeFigure() ;
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

    ctx.clearRect( 0, 0, 800, 600 )
    dessin.dessiner( ctx ) ;
});

let ctx = canvas.getContext( "2d" ) ;

// On créer un dessin vide
let dessin = new Dessin() ;
(document.querySelector( "#nom") as HTMLInputElement).value = dessin.nom ;

document.querySelector( "#btnOK" ).addEventListener( "click", async (event)=>
{
    dessin.nom = (document.querySelector( "#nom") as HTMLInputElement).value ;
    alert( "Nom du dessin mis à jour" ) ;
}) ;


// On le dessin
dessin.dessiner( ctx ) ;

document.querySelector( "#btnSave" ).addEventListener( "click", async (event)=>
{
    await dessin.save() ;
    alert( "Dessin enregistré" ) ;
}) ;

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