
export interface IDessin
{
    dessiner( ctx: CanvasRenderingContext2D | null ): void
    definirPointParPoint( xm: number, ym: number, numPoint: number): boolean 
    creerEtAjouterNouvelleFigure( nomType : string, couleur : string, epaisseur : number) : boolean
}
