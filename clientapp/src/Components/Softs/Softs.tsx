import {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { ISoft, IComponentStatus, baseUrl, PagesData, PageParams, reactUrlSofts, serverUrlSofts} from '../../Interface/types';
import { get } from './../../Utils/httpFetch';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import CreateBtn from './../Buttons/CreateBtn';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PaginationBtn from './../Buttons/PaginationBtn';
import EditBtn from './../Buttons/EditBtn';
import DeleteBtn from './../Buttons/DeleteBtn';
import SoftModal from './SoftModal';

const useStyles = makeStyles({
    titles :
    {
        fontWeight : 'bold',
        width : "20%"
    },
    icons : {
        cursor : "pointer"
    }
});


const Softs = (props : RouteComponentProps<PageParams>) => {
    let history = useHistory();
    
    const paramPage = props.match.params?.page;
    let page : number = paramPage ?  Number(props.match.params.page) : 1;
    const pageSize = 2; // для теста

    const [softs, setSofts] = useState<Array<ISoft> | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<IComponentStatus>('idle');
    const [countPage, setCountPage] = useState<number>(0);
    const classes = useStyles();

    useEffect( () => {
        get<PagesData<ISoft>>( `${baseUrl}/${serverUrlSofts}/?PageNumber=${page}&PageSize=${pageSize}` )
        .then( (response : PagesData<ISoft>) => {
            setSofts(response.items);
            setCountPage(response.countPage);
            setStatus('success');
        })
        .catch( (error : any) =>
        {
            setError(error);
            setStatus('error');
        })
    }, [page])

    //удаление из vies
    const dropInList = (id : number) : void => {
        if(softs != null)
        {
            const newArray : Array<ISoft> = softs?.filter(x => x.id !== id);

            if(newArray.length > 0)
            {
                setSofts(newArray);
            }
            else
            {
                const url : string = `/${reactUrlSofts}/page/${page - 1}`;
                history.push(url);
            }
        }
    }

    if(status === 'error')
        return <span>{error?.stack}</span>

    if(status === 'pending' || status === 'idle' )
    {
        return (
        <Grid container spacing={0} justify="center">
            <CircularProgress disableShrink />
        </Grid>
        );
    }

    if(status === "success" && softs != null && softs.length === 0)
    {
        return(
            <Grid container spacing={0} justify="center">
                <span>Нет данных</span>
                <br/> <br/>
                <CreateBtn url = {reactUrlSofts}/>
            </Grid>
        );
    }

    if(status === "success" && softs != null)
    {
        return(
            <>
                <TableContainer component={Paper}>
                    <Table  size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"  className={classes.titles}>Наименование</TableCell>
                                <TableCell align="center"  className={classes.titles}>Описание</TableCell>
                                <TableCell align="center"  className={classes.titles}>Цена</TableCell>
                                <TableCell align="center"  className={classes.titles}>Кол-во</TableCell>
                                <TableCell align="center"  className={classes.titles}>Действие</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {softs.map( (item) =>(
                                <TableRow key={item.id}>
                                    <TableCell align="center">{item.name}</TableCell>
                                    <TableCell align="center">{item.description}</TableCell>
                                    <TableCell align="center">{item.price}</TableCell>
                                    <TableCell align="center">{item.count}</TableCell>
                                    <TableCell align="center">
                                        <SoftModal 
                                            iconClassName  = {classes.icons}
                                            soft = {item}    
                                        />
                                        <EditBtn 
                                            id = {item.id}
                                            url = {reactUrlSofts}
                                            className = {classes.icons}
                                        />
                                        <DeleteBtn 
                                            id = {item.id}
                                            url = {serverUrlSofts}
                                            updateList = {dropInList}
                                            setError = {setError}
                                            setStatus = {setStatus}
                                            className = {classes.icons}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
                <CreateBtn url = {reactUrlSofts}/>
                <br/><br/>
                <PaginationBtn 
                    to = {reactUrlSofts}
                    page = { page }
                    count = { countPage }
                />
            </>
        )
    }

    return(
        <div>440</div>
    )    
    
}
export default Softs;

