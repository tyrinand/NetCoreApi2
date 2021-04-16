export const baseUrl = 'https://localhost:5001/';

// интетефейс для слайдера 
export interface IMark
{
    value : number,
    label : string
}

export interface IClient
{
    id : number,
    name : string,
    mark : number
}

export type IComponentStatus = 'idle' | 'pending' | 'success' | 'error';


export interface IBtnDeleteProprs {
    id : number,
    url : string,
    updateList (id : number) : void,
    setError (error : Error) : void,
    setStatus (status : IComponentStatus) : void
}

export interface IBtnCreate{
    url : string
}

export interface IBtnEditProprs {
    url : string,
    id : number
}

export interface RouteParams {
    id? : string,
}

export interface PageParams {
    page? : string
}

export interface PagesData<T> {
    currentPage : number,
    countPage : number,
    pageSize : number,
    items : Array<T>
}