import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import { reactUrlClients, reactUrlLogs, reactUrlSales, reactUrlSofts } from './Interface/types';
import { lazy, Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Logs = lazy(() => import('./Components/Logs/Logs'));
const FormSale = lazy(() => import('./Components/Sales/FormSale'));
const FormSoft = lazy(() => import('./Components/Softs/FormSoft'));
const FormClient = lazy(() => import('./../src/Components/Clients/FormClient'));
const Clients = lazy(() => import('./Components/Clients/Clients'));
const Sales = lazy(() => import('./Components/Sales/Sales'));
const Softs = lazy(() => import('./Components/Softs/Softs'));
const Info = lazy(() => import('./../src/Components/Info'));



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

const loader = (
  <Grid container spacing={0} justify="center">
    <CircularProgress disableShrink />
  </Grid>);

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={0}  justify="center" >
      <Grid item lg={8}  md={12}  xs={12} sm={12} >
        <AppBar  position="static">
          <Toolbar className={classes.toolbar}>
            <NavLink className={classes.link} exact to="/">Инфо</NavLink>
            <NavLink className={classes.link} to={`/${reactUrlSales}`} >Продажи</NavLink>
            <NavLink className={classes.link} to = {`/${reactUrlSofts}`}>Софт</NavLink>
            <NavLink className={classes.link} to = {`/${reactUrlClients}`} >Клиенты</NavLink>
            <NavLink className={classes.link} to = {`/${reactUrlLogs}`} >Логи</NavLink>
            <a href="/swagger/" target = "_blank"  className={classes.link}>Swagger</a>
        </Toolbar>
      </AppBar>
    </Grid>
  </Grid>
  <br/>
  <Grid container spacing={0} justify="center">
    <Grid item lg={8}  md={12}  xs={12} sm={12}>
    <Suspense fallback={loader} >
      <Switch>
          <Route path="/"       component={Info}  exact/>
          
          <Route path = {`/${reactUrlClients}`}            component = {Clients} exact />
          <Route path = {`/${reactUrlClients}/page/:page`} component = {Clients} />
          <Route path = {`/${reactUrlClients}/create`}     component = {FormClient} />
          <Route path = {`/${reactUrlClients}/edit/:id`}   component = {FormClient} />

          <Route path = {`/${reactUrlSofts}`}             component = {Softs} exact />
          <Route path = {`/${reactUrlSofts}/page/:page`}  component = {Softs} />
          <Route path = {`/${reactUrlSofts}/create`}      component = {FormSoft} />
          <Route path = {`/${reactUrlSofts}/edit/:id`}    component = {FormSoft} />

          <Route path = {`/${reactUrlSales}`}            component = {Sales} exact />
          <Route path = {`/${reactUrlSales}/page/:page`} component = {Sales} />
          <Route path = {`/${reactUrlSales}/create`}     component = {FormSale} />
          <Route path = {`/${reactUrlSales}/edit/:id`}   component = {FormSale} />

          <Route path = {`/${reactUrlLogs}`}   component = {Logs} exact />
          <Route path = {`/${reactUrlLogs}/page/:page`} component = {Logs} exact/>
          <Route path = {`/${reactUrlLogs}/page/:page/filter/:filter`} component = {Logs} />

          <Route  component={Info} />
        </Switch>
      </Suspense>
    </Grid>
  </Grid>
      <footer className={classes.footer}>
      <Grid container spacing={0} justify="center">
        <Grid item lg={8}  md={12}  xs={12} sm={12}>
          Тестовый проект
        </Grid>
      </Grid>
      </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
