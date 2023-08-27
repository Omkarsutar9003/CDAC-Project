import React, { useState,useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { useHistory } from "react-router-dom";
import myLogo from "../assets/images/mylogob.png";
import UserPic from "../assets/images/userPic.jpg";
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Box } from "@material-ui/core";

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




function Top() {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [path1, setpath1] = useState('');
    const [path2, setpath2] = useState('');
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    
    async function setpath(){
        if(localStorage.getItem("logintype")=="student"){
          setpath1("/student/dashboard")
          setpath2("/profile/student/"+localStorage.getItem("student_id"));
        }else if(localStorage.getItem("logintype")=="teacher"){
          setpath1("/teacher/dashboard");
          setpath2("/profile/teacher/"+localStorage.getItem("teacher_id"));
        }else{
          setpath1("/dashboard");
          setpath2("/profile/institute");
        }
    }

    
const sidemenu = [
  {
    title: 'Profile',
    icon: <AccountCircleOutlinedIcon/>,
    path:`${path2}`
  },
  {
    title: 'Dashboard',
    icon: <GroupOutlinedIcon/>,
    path:`${path1}`
  },
   {
    title: 'Turms & Condition',
    icon: <ContactSupportOutlinedIcon/>,
    path:''
  },
  {
    title: 'Privacy Policy',
    icon: <NewReleasesOutlinedIcon/>,
    path:''
  },
  {
    title: 'Logout',
    icon: <ExitToAppOutlinedIcon/>,
    path:'/logout'
  },
]
  
useEffect(() => {
  setpath();
},[])
    return (
        <div className={classes.root}>
            
            <AppBar position="static">
                <Container maxWidth="lg">
                    <Toolbar>
                      
                        <div className="logoOut" >
                            <img src={myLogo} alt="logo" />
                        </div>
                        <Box className="rightNav">
                            <div className="profilePic">
                                <span>
                                  { (localStorage.getItem("userpic")=="null")?<img src={UserPic} alt="logo" />:
                                  <img src={process.env.PUBLIC_URL + `/uploads/${localStorage.getItem("userpic")}`} alt="logo" />
                                  }
                                </span>
                                <em>{localStorage.getItem('Lname')}</em>
                            </div>
                            <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerOpen}
                            style={{width:'50px'}}
                            >
                            <MenuIcon />
                          </IconButton>
                       </Box>   
                    </Toolbar>
                </Container>
            </AppBar>
                    <Drawer
                    variant="persistent"
                    anchor="right"
                    open={open}
                    >
                  <div>
                  <IconButton onClick={handleDrawerClose}>
                   { open === true ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                  </div>
                  <Divider />
                  <List>
                  {sidemenu.map((text, index) => (
                    <ListItem button onClick={(e)=>history.push(text.path)}>
                      <ListItemIcon>
                      {text.icon}
                      </ListItemIcon>
                      <ListItemText>
                      {text.title}
                      </ListItemText>
                    </ListItem>
                  ))}
                  </List>
                  </Drawer>
      </div>
    );
  }
  
  export default Top;  