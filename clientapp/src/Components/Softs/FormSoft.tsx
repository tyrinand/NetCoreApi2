import { RouteComponentProps } from 'react-router-dom';
import { baseUrl, IComponentStatus, ISoft, RouteParams, serverUrlSofts } from './../../Interface/types';
import { useState } from 'react';
import {post, put, get} from '../../Utils/httpFetch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import NumberFormatPrice from './../FieldFormat/NumberFormatPrice';
import NumberFormatCount from './../FieldFormat/NumberFormatCount';
import Button from '@material-ui/core/Button';



interface SoftFormProps {
    id? : string,
}

function FormSoft(props : RouteComponentProps<SoftFormProps> ) {

    const defaultSoft : ISoft = { id : 0, name : "", description : "", price : 0, count : 0 };

    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<IComponentStatus>('idle');
    const [editMode, setEditMode] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState(false);
    const [valide, setValide] = useState<boolean>(true);
    const [soft, setSoft] = useState<ISoft>(defaultSoft);

    const targetUrl : string = `${baseUrl}/${serverUrlSofts}`;

    const softId = props.match.params?.id;
    const currentPath = props.location.pathname;

    if(softId && currentPath.indexOf('edit') !== -1 && editMode === false)
    {
        setEditMode(true);
        get<ISoft>(`${targetUrl}/${softId}`)
        .then( (response : ISoft) =>{
            setSoft(response);
            setStatus('success');
        })
        .catch(( error : Error )=>{
            setError(error);
            setStatus('error');
        })
    }

    const handelCreateSoft = (e :React.MouseEvent<HTMLButtonElement>) => {
       
        if( !CheckValide() )
            return;
       
        editMode === true ?  UpdateSoft(soft) : CreateSoft(soft);
    }

    const CheckValide = () =>{
        let value : boolean = true;

        if(
            soft.name.length === 0 ||
            soft.description.length === 0 ||
            soft.count === 0 ||
            soft.price === 0    
        )
            value = false;
        
        setValide(value);
        return value;
    }

     //запрос создания софта
     const CreateSoft = (newClient : ISoft) =>{

        const option : RequestInit = { headers : { 'Content-Type' : 'application/json' } };

        post<ISoft, boolean >(targetUrl, newClient, option)
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

    //запрос обновления софта
    const UpdateSoft = (client : ISoft) =>{
        const option : RequestInit = { headers : { 'Content-Type' : 'application/json' } };

        put<ISoft, boolean>(targetUrl, client, option)
        .then( (response : boolean) =>{
            setStatus('success');
            setShowMessage(true);
        })
        .catch( (error : Error) =>{
            setError(error);
            setStatus('error');
        } )
    }

    const SaveChange = () =>{
        setSoft(defaultSoft);
    }


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {    
        setShowMessage(false);
      };
    
    const handelChangeName = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target : {value : name }} = e;
        const newSoft : ISoft = {... soft, name : name};
        setSoft(newSoft);
    }

    const handelChangeDes = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target : {value : description}} = e;
        const newSoft : ISoft = { ...soft, description : description };
        setSoft(newSoft);
    }

    const handleChangePrice = (e : React.ChangeEvent<HTMLInputElement>) =>{
       const { target : { value : price}  } = e;
       const newSoft : ISoft = {...soft, price : Number(price) };
       setSoft(newSoft);
    }

    const handleChangeCount = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const { target : { value : count}  } = e;
        const newSoft : ISoft = {...soft, count : Number(count) };
        setSoft(newSoft);
     }

    if(status === 'error')
    {
        return <span>{error?.stack}</span>;
    }

    if(status === 'pending'  )
    {
        return (<Grid container spacing={0} justify="center">
        <CircularProgress disableShrink />
        </Grid>);
    }
    
    if( status === "success" || status === "idle" )
    {
        return(
            <>
                <Grid container spacing={0} justify = "center" >
                    <Grid item md = {8}>
                        <form autoComplete = "off">
                            <TextField 
                                error={ (valide || soft.name.length > 0) ? false : true}
                                id="softName" 
                                label="Наименование" 
                                placeholder="Введите наименование продукта"
                                fullWidth
                                onChange = {handelChangeName}
                                value = {soft.name}
                            />
                            <br/><br/>
                            <TextField 
                                error={ (valide || soft.description.length > 0) ? false : true}
                                id="softDes" 
                                label="Описание" 
                                placeholder="Введите описание продукта"
                                fullWidth
                                onChange = {handelChangeDes}
                                value = {soft.description}
                            />
                            <br/><br/>
                            <TextField 
                                error={ (valide || soft.price > 0) ? false : true}
                                id = "softPrice"
                                label = "Стоимость"
                                fullWidth
                                value = {soft.price === 0 ? "" : soft.price}
                                onChange = {handleChangePrice}
                                InputProps={{
                                    inputComponent: NumberFormatPrice as any,
                                }}
                            />
                            <br/><br/>
                            <TextField 
                                error={ (valide || soft.count > 0) ? false : true}
                                id = "softCount"
                                label = "Кол-во"
                                fullWidth
                                value = {soft.count === 0 ? "" : soft.count}
                                onChange = {handleChangeCount}
                                InputProps={{
                                    inputComponent: NumberFormatCount as any,
                                }}
                            />
                            <br/><br/>
                            <Grid container spacing={0} justify="center">
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="small"
                                    onClick = {handelCreateSoft}
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

export default FormSoft;