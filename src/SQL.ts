
export enum SQLMethode
{
    GET,
    POST
}

export class SQL
{
    static methode: SQLMethode = SQLMethode.GET ;

    public static async exec( sql: string ): Promise<any>
    {
        if( SQL.methode == SQLMethode.GET ) return SQL.execByGet( sql ) ;
        else if( SQL.methode == SQLMethode.POST ) return SQL.execByPost( sql ) ;
    } 

    public static async execByGet( sql: string ): Promise<any>
    {
        let url = window.location.href + "sql.php?sql=" + sql ;

        let reponse = await window.fetch( url ) ;
    
        let texte = await reponse.text() ;
    
        return JSON.parse( texte ) ;
    } 

    public static async execByPost( sql: string ): Promise<any>
    {
        let url = window.location.href + "sql.php" ;

        let data = { sql: sql } ;

        return new Promise<any>((resolve,reject) =>
        {
            var xhr = new XMLHttpRequest();
            xhr.open( "POST", url ) ;
            
            xhr.onload = function() 
            {
                try
                {
                    resolve( JSON.parse( xhr.responseText ) ) ;
                }
                catch( err )
                {
                    reject( "Erreur de parsing dans: " + xhr.responseText ) ;
                }
            };
            
            xhr.onerror = function() 
            {
                reject( "Erreur: " + xhr.responseText ) ;
            };
                
            var formData = new FormData();
            
            for( var attr in data )
            {
                formData.append( attr, data[attr] );
            }

            xhr.send(formData);
        }) ;            
    } 

}