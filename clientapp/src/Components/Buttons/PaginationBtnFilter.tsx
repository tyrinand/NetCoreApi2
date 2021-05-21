import { NavLink } from 'react-router-dom';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';

interface IPaginateBtnFilter {
    page : number,
    filter : string,
    count : number,
    to : string
}


const PaginationBtnFilter = (props : IPaginateBtnFilter) => {   
    return(
        <Grid container spacing={0} justify="center">
              <Pagination
                page = { props.page }
                count = { props.count }
                  renderItem={(item) => (
                    <PaginationItem
                      component={NavLink}
                      to={`/${props.to}/page/${item.page}/filter/${props.filter}`}
                      {...item}
                />
              )}
            />
              </Grid>
    )
}

export default PaginationBtnFilter;