import NumberFormat from 'react-number-format';

export const baseUrl = 'https://localhost:5001';

export const reactUrlClients :  string = "clients";
export const serverUrlClients : string = "api/client";

export const reactUrlSofts :  string = "softs";
export const serverUrlSofts: string = "api/soft";

export const reactUrlSales  :  string = "sales";
export const serverUrlSales : string = "api/sale";


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

//вывод списка
export interface ISalesView
{
    id : number,
    softName : string,
    priceOne : number, 
    count : number,
    summ : number
    dateBuyStr : string,
    clientName : string,
}

//отправка на сервер
export interface ISale
{
    id : number,
    datebuy : string | undefined | null,
    count : number,
    summ : number,
    id_client : number | null,
    id_soft : number | null,
}

// данные для формы
export interface ISaleForm
{
    sale : ISale,
    clients : Array<IClient>,
    softs : Array<ISoft>
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

export interface NumberFormatCustomProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}