import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

interface IBtnCreate{
  url : string
}

const CreateBtn = (props : IBtnCreate) => {
    const url = `/${props.url}/create`;
    return (
        <Grid container spacing={0} justify="center">
        <Button 
          variant="contained" 
          color="primary" 
          size="small"
          component={NavLink} to={url}
          >
            Добавить
          </Button>
        </Grid> 
    );
}

export default CreateBtn;