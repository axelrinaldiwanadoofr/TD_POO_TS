
export class SQL
{
    constructor()
    {

    }

    public static async exec( sql: string ): Promise<any>
    {
        let url = window.location.href + "sql.php?sql=" + sql ;

        let reponse = await window.fetch( url ) ;
    
        let texte = await reponse.text() ;
    
        return JSON.parse( texte ) ;
    } 
}