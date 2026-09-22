import { VwDessin } from "./VwDessin";

customElements.define( "vw-dessin", VwDessin ) ;

console.log( "time 0" ) ;

setTimeout( ()=>
{
    console.log( "time 1" ) ;
}, 2000 ) ;