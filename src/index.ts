import { VwDessin } from "./VwDessin";

customElements.define( "vw-dessin", VwDessin ) ;

let compteur = 0 ;

console.log( "time 0: compteur: " + compteur ) ;


// Fonction asynchrone 1
function Async2000_R1(): Promise<string>
{
    return new Promise( (resolve: any,reject: any ) =>
    {
        setTimeout( function ()
        {
            resolve( "R1" ) ;
        }, 2000 ) ;
    }) ;
}

// Fonction asynchrone 2
function Async3000_R2(): Promise<string>
{
    return new Promise( (resolve: any,reject: any ) =>
    {
        setTimeout( function ()
        {
            resolve( "R2" ) ;
        }, 3000 ) ;
    }) ;
}

// Fonction asynchrone 3
function Async4000_R3(): Promise<string>
{
    return new Promise( (resolve: any,reject: any ) =>
    {
        setTimeout( function ()
        {
            resolve( "R3" ) ;
        }, 4000 ) ;
    }) ;
}

// Tratitement asynchrone complet
Async2000_R1().then( (value)=>
{
    compteur++ ;
    console.log( "time 1: compteur: " + compteur + " value: " + value ) ;
}).then( ()=>
{
    return Async3000_R2() ;
}).then( (value)=>
{
    compteur++ ;
    console.log( "time 2: compteur: " + compteur + " value: " + value ) ;
}).then( ()=>
{
    return Async4000_R3() ;
}).then( (value)=>
{
    compteur++ ;
    console.log( "time 3: compteur: " + compteur + " value: " + value ) ;
}) ;

console.log( "fin" ) ;