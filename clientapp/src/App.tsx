import Info from './../src/Components/Info';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Softs from './Components/Softs/Softs';
import Sales from './Components/Sales/Sales';
import Clients from './Components/Clients/Clients';
import './App.css';
import FormClient from '../src/Components/Clients/FormClient';
import { reactUrlClients, reactUrlSofts } from './Interface/types';
import FormSoft from './Components/Softs/FormSoft';


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
            <NavLink className={classes.link} to = {`/${reactUrlSofts}`}>Софт</NavLink>
            <NavLink className={classes.link} to = {`/${reactUrlClients}`} >Клиенты</NavLink>
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
        
        <Route path = {`/${reactUrlClients}`}            component = {Clients} exact />
        <Route path = {`/${reactUrlClients}/page/:page`} component = {Clients} />
        <Route path = {`/${reactUrlClients}/create`}     component = {FormClient} />
        <Route path = {`/${reactUrlClients}/edit/:id`}   component = {FormClient} />

        <Route path = {`/${reactUrlSofts}`}             component = {Softs} exact />
        <Route path = {`/${reactUrlSofts}/page/:page`}  component = {Softs} />
        <Route path = {`/${reactUrlSofts}/create`}      component = {FormSoft} />
        <Route path = {`/${reactUrlSofts}/edit/:id`}    component = {FormSoft} />

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
