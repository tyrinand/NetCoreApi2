import DeleteIcon from '@material-ui/icons/Delete';
import {IComponentStatus} from './../../Interface/types';
import {deleteData} from './../../Utils/httpFetch';

interface IBtnDeleteProprs {
    id : number,
    url : string,
    updateList (id : number) : void,
    setError (error : Error) : void,
    setStatus (status : IComponentStatus) : void,
    className : string
}

const DeleteBtn = (props : IBtnDeleteProprs) =>{

const handelClick = () =>{

    const baseUrl = window.location.origin;
    
    props.setStatus('pending');

        deleteData<boolean>(`${baseUrl}/${props.url}/${props.id}`)
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
            className={props.className}
            onClick = {handelClick}
        />
    )
}

export default DeleteBtn;