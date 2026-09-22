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

    return new Promise( (resolve: any,reject: any ) =>
    {
        setTimeout( function ()
        {
            resolve( "R2" ) ;
        }, 3000 ) ;
    }) ;
})
.then( (value)=>
{
    compteur++ ;
    console.log( "time 2: compteur: " + compteur + " value: " + value ) ;

    return new Promise( (resolve: any,reject: any ) =>
    {
        setTimeout( function ()
        {
            resolve( "R3" ) ;
        }, 4000 ) ;
    });
}).then( (value)=>
{
    compteur++ ;
    console.log( "time 3: compteur: " + compteur + " value: " + value ) ;
});



console.log( "fin" ) ;