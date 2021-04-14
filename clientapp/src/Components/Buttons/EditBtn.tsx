import {IBtnEditProprs} from './../../Interface/types';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
    icons : {
      cursor : 'pointer'
    }
  });


const EditBtn = (props : IBtnEditProprs) =>{
    const classes = useStyles();
    let history = useHistory();
    const url = `/${props.url}/edit/${props.id}`;

    const handelClick = () => {  
      history.push(url);
    }

    return(
         <EditIcon  className={classes.icons} onClick={handelClick}/>
    )
}

export default EditBtn;