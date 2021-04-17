import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useState } from 'react';
import {IClient} from '../../Interface/types';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

interface IClientModal {
    client : IClient,
    iconClassName : string
}


const useStyles = makeStyles({
    paper: {
        position: 'absolute',
        width: 400,
        top: "10%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor : "#fff",
        textAlign : "center",
        padding : "25px"
      },
    titles :
    {
        fontWeight : 'bold',
        width : "15%"
    },
    table :
    {
        width : "50%"
    }
  });


export default function ClientModal(props : IClientModal) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const client = props.client;

  const body = (
    <div className={classes.paper}>
      <Grid container spacing={0} justify="center">
        <Grid item md={11}>
            <span>Информация о клиенте</span>
        </Grid>
        <Grid item md={1}>
            <CloseIcon 
                className = {props.iconClassName}
                onClick = {handleClose}
            />
        </Grid>
    </Grid>
    <br/>
        <Grid container spacing={0} justify="center">
            <Table  size="small" className={classes.table} >
                <TableBody>
                    <TableRow key={client.name}>
                        <TableCell className={classes.titles} align="left">ФИО</TableCell>
                        <TableCell  align="left">{client.name}</TableCell>
                    </TableRow>
                    <TableRow key={client.mark}>
                        <TableCell className={classes.titles} align="left">Оценка</TableCell>
                        <TableCell align="left">{client.mark}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Grid>
    </div>
  );

  return (
    <>
      <VisibilityIcon 
        className = {props.iconClassName}
        onClick = {handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}

