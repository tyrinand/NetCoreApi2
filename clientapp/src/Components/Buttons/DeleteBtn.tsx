import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import {IBtnDeleteProprs, baseUrl} from './../../Interface/types';
import {deleteData} from './../../Utils/httpFetch';

const useStyles = makeStyles({
    icons : {
      cursor : 'pointer'
    }
  });


const DeleteBtn = (props : IBtnDeleteProprs) =>{
    const classes = useStyles();

const handelClick = () =>{
    props.setStatus('pending');

        deleteData<boolean>(baseUrl + props.url +"/" + props.id)
        .then( (response : any) => {
            props.setStatus('success');
            props.updateList(props.id);
        })
        .catch( (error : any) =>{
            props.setError(error);
            props.setStatus('error');
        })
    }

    return(
        <DeleteIcon 
            className={classes.icons}
            onClick = {handelClick}
        />
    )
}

export default DeleteBtn;