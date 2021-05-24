import { IComponentStatus, PageParams, ISalesView, serverUrlSales, reactUrlSales} from "../../Interface/types"
import {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps, useHistory} from 'react-router-dom';
import { PagesData } from './../../Interface/types';
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
import SaleModal from './SaleModal';

const useStyles = makeStyles({
    titles : {
        fontWeight : 'bold',
        width : "14%"
    },
    icons : {
        cursor : "pointer"
    }
})

const Sales = (props : RouteComponentProps<PageParams>) => {

    const baseUrl = window.location.origin;

    let history = useHistory();

    const paramPage = props.match.params?.page;
    let page : number = paramPage ? Number(props.match.params.page) : 1;
    const pageSize = 2;

    const [sales, setSales] = useState<Array<ISalesView> | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<IComponentStatus>('idle');
    const [countPage, setCountPage] = useState<number>(0);
    const classes = useStyles();

    const targetUrl =  `${baseUrl}/${serverUrlSales}/?PageNumber=${page}&PageSize=${pageSize}`;

    useEffect( () => {
        get<PagesData<ISalesView>>(targetUrl )
        .then( (response : PagesData<ISalesView>) =>{
            setSales(response.items);
            setCountPage(response.countPage);
            setStatus('success');
        })
        .catch( (error : Error) =>{
            setError(error);
            setStatus('error');
        })
    }, [targetUrl]);

    const dropInList = (id : number) : void => {
        if(sales != null)
        {
            const newArray : Array<ISalesView> = sales?.filter(x => x.id !== id);

            if(newArray.length > 0)
            {
                setSales(newArray);
            }
            else
            {
                const url : string =  `/${reactUrlSales}/page/${page - 1}`;
                history.push(url);
            }
        }
    }

    if(status === 'error')
        return <span>{error?.stack}</span>;

    if(status === 'pending' || status === 'idle' )
    {
        return (
        <Grid container spacing={0} justify="center">
            <CircularProgress disableShrink />
        </Grid>
        );
    }

    if(status === "success" && sales != null && sales.length === 0)
    {
        return(
            <Grid container spacing={0} justify="center">
                <span>Нет данных</span>
                <br/> <br/>
            <CreateBtn url = {reactUrlSales}/>
            </Grid>
        );
    }

    if(status === "success" && sales != null)
    {
        return (
            <>
                <TableContainer component={Paper}>
                    <Table  size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"  className={classes.titles}>Софт</TableCell>
                                <TableCell align="center"  className={classes.titles}>Цена за единицу</TableCell>
                                <TableCell align="center"  className={classes.titles}>Кол-во</TableCell>
                                <TableCell align="center"  className={classes.titles}>Сумма</TableCell>
                                <TableCell align="center"  className={classes.titles}>Дата</TableCell>
                                <TableCell align="center"  className={classes.titles}>Клиент</TableCell>
                                <TableCell align="center"  className={classes.titles}>Действие</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sales.map( (item) =>(
                                <TableRow key={item.id}>
                                    <TableCell align="center">{item.softName}</TableCell>
                                    <TableCell align="center">{item.priceOne}</TableCell>
                                    <TableCell align="center">{item.count}</TableCell>
                                    <TableCell align="center">{item.summ}</TableCell>
                                    <TableCell align="center">{item.dateBuyStr}</TableCell>
                                    <TableCell align="center">{item.clientName}</TableCell>
                                    <TableCell align="center">
                                        <SaleModal 
                                            iconClassName  = {classes.icons}
                                            sale = {item}    
                                        />
                                        <EditBtn 
                                            id = {item.id}
                                            url = {reactUrlSales}
                                            className = {classes.icons}
                                        />
                                        <DeleteBtn 
                                            id = {item.id}
                                            url = {serverUrlSales}
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
                <CreateBtn url = {reactUrlSales}/>
                <br/><br/>
                <PaginationBtn 
                    to = {reactUrlSales}
                    page = { page }
                    count = { countPage }
                />
            </>
        );
    }

    return(<div>440</div>) 
}

export default Sales;