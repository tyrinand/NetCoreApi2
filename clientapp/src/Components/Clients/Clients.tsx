import { get } from './../../Utils/httpFetch';
import {useState, useEffect } from 'react';
import {IClient, IComponentStatus, baseUrl, PagesData, PageParams} from '../../Interface/types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteBtn from './../Buttons/DeleteBtn';
import CreateBtn from './../Buttons/CreateBtn';
import PaginationBtn from './../Buttons/PaginationBtn';
import EditBtn from './../Buttons/EditBtn';
import { RouteComponentProps } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ClientModal from './ClientModal';

const useStyles = makeStyles({
  titles :
  {
    fontWeight : 'bold',
    width : "33%"
  },
  icons : {
    cursor : 'pointer'
  }
});

const Clients = (props : RouteComponentProps<PageParams>) => {
    let history = useHistory();

    const paramPage = props.match.params.page;
    let page : number = ( (paramPage != null || paramPage != undefined) ) ?  Number(props.match.params.page) : 1;
    const pageSize = 2; // для теста

    const [clients, setClients] = useState<Array<IClient> | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<IComponentStatus>('idle');
    const [countPage, setCountPage] = useState<number>(0);
    const classes = useStyles();

    useEffect( () => {
     
        get<PagesData<IClient>>( `${baseUrl}Client/?PageNumber=${page}&PageSize=${pageSize}`)
        .then( (response : PagesData<IClient> ) => {
            setClients(response.items);
            setCountPage(response.countPage);
            setStatus('success');
        })
        .catch( (error : any) =>{
            setError(error);
            setStatus('error');
        })
    }, [page] )


    const updateList = (id : number) : void => {
        if(clients != null)
        {
          const newArray : Array<IClient> = clients?.filter(x => x.id !== id);
          if(newArray.length > 0)
          {
            setClients(newArray);
          }
          else
          {
            const url : string = '/clients/page/' + (page - 1);
            history.push(url);
          }
        }
    }


    if(status === 'error')
      return <span>{error?.stack}</span>;

    if(status === 'pending' || status === 'idle' )
    {
      return (<Grid container spacing={0} justify="center">
        <CircularProgress disableShrink />
      </Grid>);
    }
     
    

    if(status === "success" && clients != null && clients.length === 0)
    {
      return (
        <Grid container spacing={0} justify="center">
          <span>Нет данных</span>
          <br/> <br/>
          <CreateBtn url = "clients"/>
        </Grid>
      );
    }


    if(status === "success" && clients != null)
    {
        return(
            <>
              {clients.length > 0 &&
                <TableContainer component={Paper}>
                <Table  size="small">
                  <TableHead>
                    <TableRow >
                      <TableCell align="center"  className={classes.titles}>ФИО</TableCell>
                      <TableCell align="center"  className={classes.titles}>Оценка</TableCell>
                      <TableCell align="center"  className={classes.titles}>Действие</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clients.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell align="center">{item.name}</TableCell>
                        <TableCell align="center">{item.mark}</TableCell>
                        <TableCell align="center">
                          <ClientModal 
                            iconClassName  = {classes.icons}
                            client = {item}    
                          />
                          <EditBtn 
                            id = {item.id}
                            url = "clients"
                            className = {classes.icons}
                          />
                          <DeleteBtn 
                            id = {item.id}
                            url = "Client"
                            updateList = {updateList}
                            setError = {setError}
                            setStatus = {setStatus}
                            className = {classes.icons}
                          />
                         

                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              }
              
              <br/>
              <CreateBtn url = "clients"/>
              <br/><br/>
              <PaginationBtn 
                to = "clients"
                page = { page }
                count = { countPage }
              />
              
        </>
        )}

    return(
        <div>440</div>
    )    
}
export default Clients;