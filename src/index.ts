import { VwDessin } from "./VwDessin";

customElements.define( "vw-dessin", VwDessin ) ;

let compteur = 0 ;

console.log( "time 0: compteur: " + compteur ) ;

setTimeout( function ()
{
    compteur++ ;
    console.log( "time 1 compteur: " + compteur ) ;
}, 2000 ) ;

console.log( "fin" ) ;