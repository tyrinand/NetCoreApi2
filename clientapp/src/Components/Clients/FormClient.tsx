import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {IMark, baseUrl, IComponentStatus, reactUrlClients, serverUrlClients} from '../../Interface/types';
import { useState } from 'react';
import {post, put} from '../../Utils/httpFetch';
import { IClient, RouteParams } from './../../Interface/types';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RouteComponentProps } from 'react-router-dom';
import { get } from './../../Utils/httpFetch';


//работа с ползунком
let marks : Array<IMark> = [];
for(let i : number = 1 ; i < 6; i++)
{
    marks.push( { value: i, label: i.toString() } as IMark );
} 

function valueLabelFormat(value: number) {
    return marks.findIndex((mark) => mark.value === value) + 1;
}


function FormClient(props : RouteComponentProps<RouteParams>) {

    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<IComponentStatus >('idle');    
    const [client, setClient] = useState<IClient>( {mark : 1, name : "", id : 0} );
   
    const [editMode, setEditMode] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState(false); // вывод подсказки 
    const [valide, setValide] = useState<boolean>(true); // валидность формы 


    const targetUrl : string = `${baseUrl}/${serverUrlClients}`;

    const clientId = props.match.params.id;
    const currentPath = props.location.pathname;  

    if((clientId != null || clientId != undefined) && currentPath.indexOf('edit') != -1 && editMode === false)
    {
        //если режим редактирование подгрузим данные
        setEditMode(true);
        get<IClient>(targetUrl + '/' + clientId)
        .then( (response : any) => {
            setClient(response);
            setStatus('success');
        })
        .catch( (error : any) =>{
            setError(error);
            setStatus('error');
        })
    }



    const handelOnChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {target : {value : name}} = e;
        const newClient = {...client, name : name};
        setClient(newClient);
    }

    const handelOnChangeMark = (event: object, value: number | number[]) =>
    {
       if(typeof value === "number")
       {
            const newClient = {...client, mark : value};
            setClient(newClient);
       }
    }

    //запрос создания клиента
    const CreateClient = (newClient : IClient) =>{

        const option : RequestInit = { headers : { 'Content-Type' : 'application/json' } };

        post<IClient, boolean >(targetUrl, newClient, option)
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

    //запрос обновления клиента 
    const UpdateClinet = (client : IClient) =>{
        const option : RequestInit = { headers : { 'Content-Type' : 'application/json' } };

        put<IClient, boolean>(targetUrl, client, option)
        .then( (response : boolean) =>{
            setStatus('success');
            setShowMessage(true);
        })
        .catch( (error : Error) =>{
            setError(error);
            setStatus('error');
        } )
    }


    const handelCreateClient = (e :React.MouseEvent<HTMLButtonElement>) => {
       
        if( !CheckValide() )
            return;
       
        editMode == true ?  UpdateClinet(client) : CreateClient(client);
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {    
        setShowMessage(false);
      };

    const SaveChange = () =>{
        setClient({mark : 1, name : "", id : 0});
    }

    const CheckValide = () =>{
        const value : boolean = client.name.length != 0;
        setValide(value);
        return value;
    }

    if(status === 'error')
        return <span>{error?.stack}</span>;
    
    if(status === 'pending'  )
    {
        return (<Grid container spacing={0} justify="center">
        <CircularProgress disableShrink />
        </Grid>);
    }    

if(status === "success" || status === 'idle')
{
    return (
        <>
            <Grid container spacing={0} justify="center">
                <Grid item md={8}>
                    <form autoComplete="off">
                        <TextField 
                            error={ (valide || client.name.length > 0) ? false : true}
                            id="userName" 
                            label="ФИО" 
                            placeholder="Введите ФИО клиента"
                            fullWidth
                            onChange = {handelOnChange}
                            value = {client.name}
                        />
                       <br/><br/>
                         <Typography gutterBottom>
                            Оценка пользователя
                        </Typography>
                         <Slider
                            value = {client.mark}
                            valueLabelFormat={valueLabelFormat}
                            aria-labelledby="discrete-slider-restrict"
                            step={null}
                            valueLabelDisplay="auto"
                            marks={marks}
                            min={1}
                            max={5}
                            onChange = {handelOnChangeMark}
                        />
                        <br/><br/>
                        <Grid container spacing={0} justify="center">
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size="small"
                                onClick = {handelCreateClient}
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

return(
    <div>440</div>
)  

}

export default FormClient;