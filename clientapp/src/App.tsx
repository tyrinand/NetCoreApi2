import Info from './../src/Components/Info';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Soft from './Components/Soft/Soft';
import Sales from './Components/Sales/Sales';
import Clients from './Components/Clients/Clients';
import './App.css';
import FormClient from '../src/Components/Clients/FormClient';


const useStyles = makeStyles( (theme) =>  ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '95vh'
  },
  footer: {
    marginTop: 'auto',
    minHeight: '5vh',
    textAlign : "center"
  },
  link: {
    color: "#002984",
    margin : "10px",
    textDecoration : "none"
  },
  toolbar: {
    flexWrap: 'wrap',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={0}  justify="center" >
      <Grid item md={8}  >
        <AppBar  position="static">
          <Toolbar className={classes.toolbar}>
            <NavLink className={classes.link} exact to="/">Инфо</NavLink>
            <NavLink className={classes.link} to="/sales">Продажи</NavLink>
            <NavLink className={classes.link} to="/soft">Софт</NavLink>
            <NavLink className={classes.link} to="/clients">Клиенты</NavLink>
        </Toolbar>
      </AppBar>
    </Grid>
  </Grid>
  <br/>
  <Grid container spacing={0} justify="center">
    <Grid item md={8}>
    <Switch>
        <Route path="/"       component={Info}  exact/>
        <Route path="/sales"  component={Sales} />
        <Route path="/soft"   component={Soft} />
        <Route path="/clients" component={Clients} exact/>
        <Route path="/clients/create" component={FormClient} />
        <Route path="/clients/edit/:id" component={FormClient} />
        <Route  component={Info} />
      </Switch>
    </Grid>
  </Grid>
      <footer className={classes.footer}>
      <Grid container spacing={0} justify="center">
        <Grid item md={8}>
          Тестовый проект
        </Grid>
      </Grid>
      </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
