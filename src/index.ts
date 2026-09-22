import { VwDessin } from "./VwDessin";

customElements.define( "vw-dessin", VwDessin ) ;

let compteur = 0 ;

console.log( "time 0: compteur: " + compteur ) ;

setTimeout( function ()
{
    compteur++ ;
    console.log( "time 1 compteur: " + compteur ) ;

    setTimeout( function()
    {
        compteur++ ;
        console.log( "time 2 compteur: " + compteur ) ;
   
        setTimeout( function()
        {
            compteur++ ;
            console.log( "time 3 compteur: " + compteur ) ;
        }, 4000 ) ;
    }, 3000 ) ;
}, 2000 ) ;

console.log( "fin" ) ;