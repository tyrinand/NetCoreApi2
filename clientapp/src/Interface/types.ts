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

export interface ISoft
{
    id : number,
    name : string,
    description : string,
    price : number,
    count : number
}

export type IComponentStatus = 'idle' | 'pending' | 'success' | 'error';


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