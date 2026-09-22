export interface IMaMethode
{
  maMethode(): void ;
}


export function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) 
{
  return class extends constructor implements IMaMethode {
    reportingURL = "http://www...";
    maMethode(): void {
      console.log( "ma méthode") ;
    }
  };
}


export function sealed(constructor: Function) 
{
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}