import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

import { useHistory } from "react-router-dom";
import myLogo from "./assets/images/mylogob.png";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

function Top(props) {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Container maxWidth="lg">
                    <Toolbar>
                        {/* <div className="menuButton">
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                            </IconButton>
                        </div> */}
                        <div className="logoOut">
                            <img src={myLogo} alt="logo" />
                        </div>{
                          (props.title=="Register")?<Button color="inherit" onClick={()=>history.push("/register")} className="topButton" >{props.title}</Button>
                          :<Button color="inherit" onClick={()=>history.push("/signin")} className="topButton" >{props.title}</Button>
                        }
                        
                    </Toolbar>
                </Container>
            </AppBar>
      </div>
    );
  }
  
  export default Top;  