import { get } from './../../Utils/httpFetch';
import {useState, useEffect } from 'react';
import {IClient, IComponentStatus, baseUrl} from '../../Interface/types';
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
import EditBtn from './../Buttons/EditBtn';

const useStyles = makeStyles({
  titles :
  {
    fontWeight : 'bold'
  }
});

const Clients = () => {

    const [clients, setClients] = useState<Array<IClient> | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<IComponentStatus>('idle');
    const classes = useStyles();

    useEffect( () => {
        get<Array<IClient>>(baseUrl + 'Client')
        .then( (response : any) => {
            setClients(response);
            setStatus('success');
        })
        .catch( (error : any) =>{
            setError(error);
            setStatus('error');
        })
    }, [] )


    const updateList = (id : number) : void => {
        if(clients != null)
        {
          const newArray : Array<IClient> = clients?.filter(x => x.id != id);
          setClients(newArray);
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
                          <EditBtn 
                            id = {item.id}
                            url = "clients"
                          />
                          <DeleteBtn 
                            id = {item.id}
                            url = "Client"
                            updateList = {updateList}
                            setError = {setError}
                            setStatus = {setStatus}
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
        </>
        )
    }

    return(
        <div>440</div>
    )    
}
export default Clients;