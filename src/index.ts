import {Test} from "./Test"
import {Figure} from "./Figure" ;
import {Point} from "./Point" ;
import {Dessin} from "./Dessin" ;
import {FgPoint} from "./FgPoint" ;
import { FgRectangle } from "./FgRectangle";
import { FgSegment } from "./FgSegment";
import {SQL, SQLMethode} from "./SQL" ;

let message: Test ;
message = new Test( "coucou") ;
message.afficheMessage() ;

// Definit la méthode POST pour les accès à la BD
SQL.methode = SQLMethode.POST ;

// Figure courante
let figureCourante: Figure = null ;
// Compteur de click
let compteurDeClick = 0 ;

function creeFigure()
{
    if( choixFigure.value == "0" ) figureCourante = new FgPoint( new Point(0, 0), choixCouleur.value ) ;
    if( choixFigure.value == "1" ) figureCourante = new FgSegment( new Point(0, 0), new Point(0, 0), choixCouleur.value ) ;
    if( choixFigure.value == "2" ) figureCourante = new FgRectangle( new Point(0, 0), new Point(0, 0), choixCouleur.value ) ;

    if( figureCourante )
    {
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

document.querySelector( "#btnLoad" ).addEventListener( "click", async (event)=>
{
    let nom = (document.querySelector( "#nom") as HTMLInputElement).value ;    

    if( nom != "" )
    {
        dessin = new Dessin() ;
        await dessin.load( nom ) ;
        dessin.dessiner( ctx ) ;
    }
}) ;


// Test de haschage

const arrayBufferToHex = require('array-buffer-to-hex') ;

async function TestDeHashage( motDePasse: string )
{
    let data = new TextEncoder().encode( motDePasse) ;
    let empreinte = await crypto.subtle.digest( "SHA-1", data ) ;

    console.log( "Empreinte: " + arrayBufferToHex(empreinte) ) ;
}


TestDeHashage( "Ceci est un mot de pBsse" ) ;
TestDeHashage( "Ceci est un mot de pBsse" ) ;
TestDeHashage( "Ceci est un mot de pCsse" ) ;


// Test de chiffrement / déchiffrement AES
async function TestDeChiffrementDechiffrementAES()
{
    // Générer une clé de chiffrement/déchiffrmeent AES-CBC de 128 bits
    let key = await crypto.subtle.generateKey( 
        { 
            name: "AES-CBC",
            length: 128
        }, true, ["decrypt", "encrypt"] ) ;

    let bits = await crypto.subtle.exportKey( "raw", key ) ;
    let octets = new Uint8Array( bits ) ;
    let keyStringHex = arrayBufferToHex( octets ) ;

    console.log( "Key: " + keyStringHex ) ;

    // Chiffrement d'un message
    let message = "Bonjour, nous allons faire un test de chiffrement d'un message" ;
    let messageData = new TextEncoder().encode( message ) ;

    // Creation d'un vecteur d'initialisation aléatoire
    let iv = crypto.getRandomValues( new Uint8Array(16) ) ;
    console.log( "IV: " + arrayBufferToHex( iv ) ) ;

    console.log( "Message: " + message ) ;

    let messageChiffre = await crypto.subtle.encrypt( 
        {
            name: "AES-CBC",
            iv: iv
        }, key, messageData ) ;
    
    console.log( "Message chiffré: " + arrayBufferToHex(messageChiffre) ) ;

    let messageOriginal = await crypto.subtle.decrypt( 
        {
            name: "AES-CBC",
            iv: iv
        }, key, messageChiffre ) ;
    
    console.log( "Message déchiffré: " + new TextDecoder().decode( messageOriginal ) ) ;
}

TestDeChiffrementDechiffrementAES() ;


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