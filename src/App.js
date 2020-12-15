import Report from './Report';
import ReportList from './ReportList';
import Form from './Form';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Grid,AppBar,Toolbar,Typography,Button}from '@material-ui/core';
import {useState, useEffect} from "react";
import Axios from "axios";

const App= ()=> {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,   
    },
    paper: {
      margin: theme.spacing(2, 2, 2),
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
    title: {
      flexGrow: 1,
    },
    hello:{
      margin: theme.spacing(2, 0, 0),
      textAlign: 'center',
      flexGrow: 1
    }
  }));
  
  const classes = useStyles();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  

  useEffect(() => {
    Axios.get("http://ec2-54-196-120-81.compute-1.amazonaws.com:9000/login/success",
    {withCredentials:true},
    {headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    }})
    .then(response=>response.data)
    .then(res=>{setUser(res.user);setLoggedIn(res.success);})
  }, [isLoggedIn])

  const handleLoginClick = (e) => {
    e.preventDefault();
    window.location.href="http://ec2-54-196-120-81.compute-1.amazonaws.com:9000/login";
  }
  const handleLogoutClick = (e) =>{
    e.preventDefault();
    window.location.href="http://ec2-54-196-120-81.compute-1.amazonaws.com:9000/logout";
  }
  const handleLoginHelperClick = (e) =>{
    e.preventDefault();
    Axios.get("http://ec2-54-196-120-81.compute-1.amazonaws.com:9000/login/success",
    {withCredentials:true},
    {headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    }})
    .then(response=>response.data)
    .then(res=>{setUser(res.user);setLoggedIn(res.success);})
  }

  const renderAuthButton = ()=>{
    if(isLoggedIn){
      return <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
    } else{
      return <Button color="inherit" onClick={handleLoginClick}>Login</Button>
    }
  }
  return (
    <div className={classes.root}>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Community Report
          </Typography>
          {renderAuthButton()}
        </Toolbar>
      </AppBar>
      {(isLoggedIn)?
      (<Typography component="h6"className={classes.hello}>Halo, {user.displayName}</Typography>)
      :(<Typography component="h6"className={classes.hello}>Login untuk menggunakan layanan</Typography>)}
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}><Form/></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}><ReportList/></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}><Report/></Paper>
        </Grid>
      </Grid>
      <Typography component="h6"className={classes.hello}>Muhamad Hudan Widzamil ©2020</Typography>
      <Button color="inherit" onClick={handleLoginHelperClick}>Login Helper</Button>
    </div>
  );
}

export default App;
