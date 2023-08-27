import React,{useState,useEffect} from 'react';
import { Container, Paper, Typography, Box,Grid, Button, Divider } from '@material-ui/core';
import { useHistory,useParams } from "react-router-dom";
import { makePostRequest, makeGetRequest } from "../util/utils";
import swal from "sweetalert";
import Footer from "./footer";
import Top3 from './top3';
import UserPic from "../assets/images/userPic.jpg";
import PostIcon from "../assets/images/postIcon.svg";
import GroupGrey from "../assets/images/group-grey.svg";
import { FaEdit } from "react-icons/fa";
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Edit from "../assets/images/edit.svg";

export default function InstituteProfile(){


    return(
        <div className="plashBox">
           <Top3/>
           <div className="mainBoxInner">
           <Container maxWidth="md">
                <Paper spacing={3} className="plashPaper"  >
                    <Box className=" popupSpace memberDetails noSpaceSide">
                        <Box className="profilePicInner" >
                            <Badge
                            overlap="circle"
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                            }}
                            badgeContent={<FaEdit style={{color:'gray'}} />}
                            >
                           {
            (localStorage.getItem("userpic")=="null")?  <Avatar style={{height:'90px', width:'90px'}}  src={UserPic} />
            :  <Avatar style={{height:'90px', width:'90px'}} src={process.env.PUBLIC_URL + `/uploads/${localStorage.getItem("userpic")}`}  />
        }
                            </Badge>
                        </Box>
                        <h3 className="noLink" ></h3>
                        <h4 className="bottSpace"></h4>
                        <Box className="memberDetailsCount">
                            <Box className="countsBox">
                               
                            </Box>
                        </Box>
                        <Box className="profileDetails">
                            <Box className="editOut">
                               
                            </Box>
                            <List>
                                <ListItem>
                                    <label>Name</label>
                                    <span>{localStorage.getItem("Lname")} </span>
                                </ListItem> 
                                {/* <ListItem>
                                    <label>Institute Name</label>
                                    <span>{MemberData.institute_name}</span>
                                </ListItem> */}
                                <ListItem>
                                <Grid container spacing={3}>
                                <Grid item xs={5} >
                                    <label>Email ID</label>
                                </Grid>
                                <Grid item xs={7}>
                                    <span>{localStorage.getItem("institute_email")}</span>
                                </Grid>
                                </Grid>
                                </ListItem>
                                <ListItem>
                                    <label>Mobile Number</label>
                                    <span>{localStorage.getItem("institute_contact")}</span>
                                </ListItem>
                            </List>    
                        </Box>
                    </Box>
                </Paper>
            </Container>
            </div>
            <Footer />
        </div>
    );
}