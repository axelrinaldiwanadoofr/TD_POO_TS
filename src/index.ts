import { VwDessin } from "./VwDessin";

customElements.define( "vw-dessin", VwDessin ) ;

let compteur = 0 ;

console.log( "time 0: compteur: " + compteur ) ;


// Fonction asynchrone 1
async function Async2000_R1(): Promise<string>
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
async function Async3000_R2(): Promise<string>
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
async function Async4000_R3(): Promise<string>
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
async function TraitementComplet()
{
    let value = await Async2000_R1() ;

    compteur++ ;
    console.log( "time 1: compteur: " + compteur + " value: " + value ) ;

    value = await Async3000_R2() ;

    compteur++ ;
    console.log( "time 2: compteur: " + compteur + " value: " + value ) ;

    value = await Async4000_R3() ;

    compteur++ ;
    console.log( "time 3: compteur: " + compteur + " value: " + value ) ;
}

TraitementComplet() ;

console.log( "fin" ) ;