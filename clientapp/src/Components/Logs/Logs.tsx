import { IComponentStatus, PageParamsFilter, ILogs, baseUrl, serverUrlLogs, reactUrlLogs} from "../../Interface/types"
import {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps, useHistory} from 'react-router-dom';
import { PagesData } from './../../Interface/types';
import { get } from './../../Utils/httpFetch';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PaginationBtnFilter from './../Buttons/PaginationBtnFilter';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles({
    titles : {
        fontWeight : 'bold',
        width : "25%"
    },
    icons : {
        cursor : "pointer"
    }
})

const Logs = (props : RouteComponentProps<PageParamsFilter>) =>{

    let history = useHistory();

    const paramPage = props.match.params?.page;
    let page : number = paramPage ? Number(props.match.params.page) : 1;
    const pageSize = 5;

    const paramFilter = props.match.params?.filter;
    let filter : string = paramFilter ? paramFilter : "All";

    const [logs, SetLogs] = useState<Array<ILogs> | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<IComponentStatus>('idle');
    const [countPage, setCountPage] = useState<number>(0);
    const classes = useStyles();

    useEffect( () => {
        get<PagesData<ILogs>>( `${baseUrl}/${serverUrlLogs}/?PageNumber=${page}&PageSize=${pageSize}&Filter=${filter}` )
        .then( (response : PagesData<ILogs>) =>{
            SetLogs(response.items);
            setCountPage(response.countPage);
            setStatus('success');
        })
        .catch( (error : Error) =>{
            setError(error);
            setStatus('error');
        })
    }, [page, filter]);

    const handelFilter = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value;
        const url : string =  `/${reactUrlLogs}/page/1/filter/${value}`;
        history.push(url);
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

    if(status === "success" && logs != null && logs.length === 0)
    {
        return(
            <Grid container spacing={0} justify="center">
                <span>Нет данных</span>
                <br/> <br/>
            </Grid>
        );
    }

    if(status === "success" && logs != null)
    {
        return (
            <>
            <FormControl component="fieldset" size="small">
                <RadioGroup row 
                    aria-label="position" 
                    name="position" 
                    defaultValue="All"  
                    onChange = {handelFilter}
                >
                    <FormControlLabel
                        value="All"
                        control={
                            <Radio color="primary" />
                        }
                        label="Все"
                    />
                     <FormControlLabel
                        value="Info"
                        control={<Radio color="primary" />}
                        label="Инфо"
                    />
                    <FormControlLabel
                        value="Error"
                        control={<Radio color="primary" />}
                        label="Ошибки"
                    />
                </RadioGroup>
            </FormControl>



                <TableContainer component={Paper}>
                    <Table  size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"  className={classes.titles}>Время</TableCell>
                                <TableCell align="center"  className={classes.titles}>Уровень события</TableCell>
                                <TableCell align="center"  className={classes.titles}>Сообщение</TableCell>
                                <TableCell align="center"  className={classes.titles}>Stack Trace</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logs.map( (item) =>(
                                <TableRow key={item.id}>
                                    <TableCell align="center">{item.timeStampStr}</TableCell>
                                    <TableCell align="center">{item.level}</TableCell>
                                    <TableCell align="center">{item.message}</TableCell>
                                    <TableCell align="center">{item.stackTrace == null ? "-" : item.stackTrace}</TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/><br/>
                <PaginationBtnFilter 
                    to = {reactUrlLogs}
                    page = { page }
                    count = { countPage }
                    filter = {filter}
                />
            </>
        );
    }

    return(<div>440</div>) 
}

export default Logs;