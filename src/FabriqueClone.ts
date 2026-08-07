
export interface Clonable<T>
{
    cloner() : Clonable<T> ;
}

export class FabriqueClone<T>
{
    public modeles: Map<string,Clonable<T>> = new Map<string,Clonable<T>>() ;

    public ajouter( cle: string, modele: Clonable<T> )
    {
        this.modeles.set( cle, modele ) ;
    }

    public clone( cle: string ): Clonable<T> | null
    {
        let modele = this.modeles.get( cle ) ;
        if( modele ) return modele.cloner() ;
        else return null ;
    }

    public iterateurDesCles(): MapIterator<[string,Clonable<T>]>
    {
        return this.modeles.entries() ;
    }
}

