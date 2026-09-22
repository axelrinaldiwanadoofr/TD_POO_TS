import { VwDessin } from "./VwDessin";

customElements.define( "vw-dessin", VwDessin ) ;

let compteur = 0 ;

console.log( "time 0: compteur: " + compteur ) ;

let unePromise = new Promise( (resolve: any,reject: any ) =>
{
    setTimeout( function ()
    {
        resolve( "R1" ) ;
    }, 2000 ) ;
})
.then( (value ) =>
{
    compteur++ ;
    console.log( "time 1: compteur: " + compteur + " value: " + value ) ;
})

console.log( "fin" ) ;