import { VwDessin } from "./VwDessin";
import { Dessin } from "./Dessin" ;

async function chargeListeDessin(): Promise<Array<Map<string,any>>>
{
    let url = "../src/php/dessins/listeDessin.php" ;
    let response = await fetch( url ) ;
    let data = await response.json() as Array<Map<string,any>> ;
    return data ;
}

async function updateListeDessin(): Promise<void>
{
    let listeDessin = document.getElementById( "listeDessin" ) as HTMLSelectElement ;
    let data = await chargeListeDessin() ;

    let html = "" ;
    data.forEach( (dessinData)=>
    {
        html += "<option value=" + dessinData["nom"] + ">" + dessinData["nom"] + "</option>" ;
    }) ;
    listeDessin.innerHTML = html ;
}

customElements.define( "vw-dessin", VwDessin ) ;

updateListeDessin() ;

document.getElementById( "chargeDessin")?.addEventListener( "click", async (event)=>
{
    let listeDessin = document.getElementById( "listeDessin" ) as HTMLSelectElement ;
    let vwDessin = document.getElementById( "vwDessin") as VwDessin ;

    if( listeDessin.value )
    {
        let url = "../src/php/dessins/chargeDessin.php?nom=" + listeDessin.value ;
        let response = await fetch( url ) ;
        let data = await response.json() as Array<Map<string,any>> ;
        
        if( data.length )
        {
            let dessin = new Dessin() ;
            dessin.createFiguresFromData( data ) ;
            vwDessin.setDessin( dessin ) ;
            return true ;
        }
    }
    return false ;
}) ;

