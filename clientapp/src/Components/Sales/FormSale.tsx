import { RouteComponentProps } from "react-router-dom";
import { IComponentStatus, ISale, ISoft, RouteParams, serverUrlSales } from "../../Interface/types";
import { ISaleForm, IClient } from './../../Interface/types';
import {useState, useEffect} from 'react';
import {post, put, get} from '../../Utils/httpFetch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import SelectList from './SelectList';
import TextField from '@material-ui/core/TextField';
import NumberFormatPrice from './../FieldFormat/NumberFormatPrice';
import NumberFormatCount from './../FieldFormat/NumberFormatCount';
import Button from '@material-ui/core/Button';


const FormSale = (props : RouteComponentProps<RouteParams>) => {

    const defaultSale : ISale = { id : 0, datebuy : null, count : 0, summ : 0, id_client : null, id_soft : null };

    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<IComponentStatus>('idle');
    const [editMode, setEditMode] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState(false);
    const [valide, setValide] = useState<boolean>(true);
    const [sale, setSale] = useState<ISale>(defaultSale);
    const [clients, setClients] = useState<Array<IClient>>([]);
    const [softs, setSoft] = useState<Array<ISoft>>([]);
    const [priceOne, setPriceOne] = useState<number|null>(null);

    const baseUrl = window.location.origin;



   

    let saleId  = props.match.params?.id;
    const currentPath = props.location.pathname;

    if(saleId && currentPath.indexOf('edit') !== -1 && editMode === false )
    {
        setEditMode(true);
    }

    if(!saleId)
        saleId = "";

    const getFormUrl  : string = `${baseUrl}/api/SaleForm/${saleId}`;

    const targetUrl  : string = `${baseUrl}/${serverUrlSales}`;


    useEffect( () => {
        get<ISaleForm>(getFormUrl)
        .then( (response : ISaleForm) => {
            if(editMode)
            {
                const price = response.softs.find(soft => soft.id === response.sale.id_soft)?.price;
                if(price)
                    setPriceOne(price);
            }
            setClients(response.clients);
            setSoft(response.softs);
            const sale = {...response.sale, datebuy : response.sale.datebuy?.split("T")[0] };
            setSale(sale);
            setStatus('success');
        })
        .catch( (error : Error) =>{
            setError(error);
            setStatus('success');
        })
    }, [getFormUrl, editMode]);

   


    const handelCreateSale = (e : React.MouseEvent<HTMLButtonElement>) => {

        if( !CheckValide() )
            return;

        if(sale !== null)    
            editMode === true ? UpdateSoft(sale) : CreateSale(sale);
    }

    const CheckValide = () =>{
        let value : boolean = true;
        
        if(
            sale.count === 0 ||
            sale.datebuy === null ||
            sale.id_client === null ||
            sale.id_soft === null ||
            sale.summ === 0 
        )
        value = false;

        setValide(value);
        return value;
    }

    const CreateSale = (newSale : ISale) => {
        const option : RequestInit = { headers : { 'Content-Type' : 'application/json' } };

        post<ISale, boolean >(targetUrl, newSale, option)
        .then( (response : boolean ) =>{
            setStatus('success');
            SaveChange();
            setShowMessage(true);
        })
        .catch( (error : Error) =>{
            setError(error);
            setStatus('error');
        })
    }

    const SaveChange = () =>{
        setPriceOne(null);
        setSale(defaultSale);
    }

    const UpdateSoft = (sale : ISale) =>{
        const option : RequestInit = { headers : { 'Content-Type' : 'application/json' } };
        put<ISale, boolean>(targetUrl, sale, option)
        .then( (response : boolean) =>{
            setStatus('success');
            setShowMessage(true);
        })
        .catch( (error : Error) =>{
            setError(error);
            setStatus('error');
        } )
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {    
        setShowMessage(false);
    };


    const handleChangeClient = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value : number = event.target.value as number;
        const newSale : ISale = {...sale, id_client : value};
        setSale(newSale);
    };

    const handleChangeSoft = (event: React.ChangeEvent<{ value: unknown }>) => {
        const soft_id : number = event.target.value as number;
        const price = softs.find(soft => soft.id === soft_id)?.price;
        UpdateField(sale.count , soft_id , price);
    };

    const handleChangeCount = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const { target : { value : count}  } = e;
        UpdateField( Number(count), sale.id_soft ,priceOne);
     }

    const UpdateField = ( count : number, id_soft : number | null , price : number | undefined | null ) =>{

        if(price)
        {
            const summ = price * count;
            setPriceOne(price);
            const newSale : ISale = {...sale, count : Number(count), summ : summ, id_soft :  id_soft };
            setSale(newSale);
        }
    }

    const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {target : {value : date}} = event;
        const newSale : ISale = {...sale, datebuy : date};
        setSale(newSale);
    };

    

    if(status === 'error')
    {
        return <span>{error?.stack}</span>;
    }

    if(status === 'pending'  )
    {
        return (
        <Grid container spacing={0} justify="center">
            <CircularProgress disableShrink />
        </Grid>);
    }

    if( status === "success" )
    {
        return(
            <>
                <Grid container spacing={0} justify = "center" >
                    <Grid item md = {8}>
                        <form autoComplete = "off">
                            <SelectList
                                error = { (valide ||  sale.id_client !== null) ? false : true }
                                labelTitle = "Клиент"
                                labelId = "sale-client-label"
                                htmlId = "sale-client"
                                value = {sale.id_client === null ? "" : sale.id_client}
                                handelChange = {handleChangeClient}
                                items = {clients}
                                emptyLabel = "Добавьте клиентов"
                            />
                            <br/><br/>
                            <SelectList
                                error = { (valide ||  sale.id_soft !== null) ? false : true }
                                labelTitle = "Софт"
                                labelId = "sale-soft-label"
                                htmlId = "sale-soft"
                                value = {sale.id_soft === null ? "" : sale.id_soft}
                                handelChange = {handleChangeSoft}
                                items = {softs}
                                emptyLabel = "Добавьте софт"
                            />
                            <br/><br/>
                            <TextField
                                error = { (valide || sale.datebuy !== null) ? false : true }
                                id="sale-date"
                                fullWidth
                                label="Дата продажи"
                                type="date"
                                value = {sale.datebuy === null ? "" : sale.datebuy}
                                InputLabelProps={{ shrink: true, }}
                                onChange = {handleChangeDate}
                            />
                            <br/><br/>
                            <TextField 
                                error={ (valide || sale.count > 0) ? false : true}
                                id = "softCount"
                                label = "Кол-во"
                                fullWidth
                                value = {sale.count === 0 ? "" : sale.count}
                                onChange = {handleChangeCount}
                                InputProps={{
                                    inputComponent: NumberFormatCount as any,
                                }}
                            />
                            <br/><br/>
                            <TextField 
                                label = "Цена за единицу"
                                variant="filled" 
                                fullWidth
                                disabled
                                value = {priceOne == null ? "" : priceOne}
                                InputLabelProps={{ shrink: priceOne !== null }}
                            />
                            <br/><br/>
                            <TextField 
                                label = "Полная стоимость"
                                fullWidth
                                variant="filled" 
                                disabled
                                value = {sale.summ === 0 ? "" : sale.summ}
                                InputProps={{
                                    inputComponent: NumberFormatPrice as any,
                                }}
                                InputLabelProps={{ shrink: sale.summ !== 0 }}
                            />
                            <br/><br/>
                            <Grid container spacing={0} justify="center">
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="small"
                                    onClick = {handelCreateSale}
                                    >
                                    Сохранить
                                </Button>
                            </Grid>
                        </form>
                        <Snackbar 
                        open={showMessage} 
                        autoHideDuration={6000} 
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        >
                        <Alert onClose={handleClose} severity="success">
                            Данные успешно сохранены
                        </Alert>
                    </Snackbar>
                    </Grid>
                </Grid>
            </>
        )
    }

    return(<div>440</div>) 
}
export default FormSale;