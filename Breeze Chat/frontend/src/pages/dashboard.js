
import React, {useEffect,useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { Button, Tooltip,Select, Checkbox,Grid, Box,Chip } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useHistory,useParams } from "react-router-dom";
import Top3 from './top3';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import {Formik,Form} from 'formik';
import * as Yup from'yup';
import UserPic from "../assets/images/userPic.jpg";
import GroupPic from "../assets/images/groupPic.jpg";
import MemberIcon from "../assets/images/memberIcon.svg";
import Groups from "../assets/images/groups.svg";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import swal from 'sweetalert';
import { makePostRequest ,makeGetRequest} from "../util/utils";



function Dashboard1() {
   const history = useHistory();
   
  
    const[Iname,setIname]=useState('');
    const[institute,setinstitute]=useState([]);
    const[stud_data,setstud_data]=useState([]);
    const[studcount,studsetcount]=useState(0);
    const [q, setq] = useState('');

    const[tea_data,settea_data]=useState([]);
    const[tcount,settcount]=useState(0);
    const [q1, setq1] = useState('');

    const[grp_data,setgrp_data]=useState([]);
    const[gcount,setgcount]=useState(0);
    const [q2, setq2] = useState('');

    const[page,setpage]=useState(1);
    const[perpage,setperpage]=useState(5);   

  

   async function viewinstitute(){
    let bodyFormData = new FormData();
    makeGetRequest("/view/institute/"+localStorage.getItem("institute_id"), bodyFormData).then((response) => {
        if(response.data.status === "1") {
            setinstitute(response.data.data)
            setIname(response.data.data[0].institute_name)
        }else{
            setinstitute([])
        }    
    }).catch((err) => {
      swal("There was an error!", "more error details", "warning");
    });
  }
  
 //view group
 async function viewgroup(){
    let bodyFormData = new FormData();
    makeGetRequest(`/view/group?id=${localStorage.getItem("institute_id")}&type=admin`, bodyFormData).then((response) => {
        if(response.data.status === "1") {
            setgrp_data(response.data.data)
            setgcount(response.data.gcount)
        }else{
            setgrp_data([])
        }    
    }).catch((err) => {
      swal("There was an error!", "more error details", "warning");
    });
  }

  //search group
  async function saerchgroup(){
    let bodyFormData = new FormData();
    makeGetRequest(`/search/group?find=${q2}&id=${localStorage.getItem("institute_id")}`, bodyFormData).then((response) => {
        if(response.data.status === "1") {
            setgrp_data(response.data.data)
        }else{
            setgrp_data([])
        }    
    }).catch((err) => {
      swal("There was an error!", "more error details", "warning");
    });
  }

//view student
async function viewstudent(){
    let bodyFormData = new FormData();
    makeGetRequest(`/view/student?id=${localStorage.getItem("institute_id")}&page=${page}&perpage=${perpage}&delay=1`, bodyFormData).then((response) => {
        if(response.data.status === "1") {
            setstud_data(response.data)
            studsetcount(response.data.scount)
        }else{
            setstud_data([])
        }    
    }).catch((err) => {
      swal("There was an error!", "more error details", "warning");
    });
  }

  async function viewteacher(){
    let bodyFormData = new FormData();
    makeGetRequest(`/view/teacher?id=${localStorage.getItem("institute_id")}&page=${page}&perpage=${perpage}&delay=1`, bodyFormData).then((response) => {
        if(response.data.status === "1") {
            settea_data(response.data)
            settcount(response.data.tcount)
        }else{
            settea_data([])
        }    
    }).catch((err) => {
      swal("There was an error!", "more error details", "warning");
    });
  }


  let l2=q2.length
  
    useEffect(()=>{

     viewinstitute();
     viewteacher()
     viewstudent()
     if(l2>0){
        saerchgroup()
     }else{
        viewgroup();
     }
    },[l2])

    return (
       <div className="plashBox">
           <Top3/>
           <div className="mainBoxInner">
           <Container maxWidth="lg">
                <Paper className="myPaper" >
                <div className="innerSpace fillWidth">
                <Grid container spacing={3}>
                    <Grid item xs={3} className="alPostLeft">
                    <div className="profilePicInner">
                    <img src={process.env.PUBLIC_URL + `/uploads/${localStorage.getItem("userpic")}`} alt="logo" />          
                    </div>
                    <div className="instituteName">
                        <h2>{Iname}</h2>
                        <b>Institute</b>
                    </div> 
                    </Grid>
                    <Grid item xs={6} className="alPostMid">
                        <span>
                            <img src={MemberIcon} alt="profilepic" />  
                        </span>
                        <div className="countsOut">
                            <h2>{studcount}</h2>
                            <p>Members</p>
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <span>
                            <img src={Groups} alt="profilepic" />  
                        </span>
                        <div className="countsOut">
                            <h2>{tcount}</h2>
                            <p>Teachers</p>
                        </div> 
                        <Divider orientation="vertical" flexItem />
                        <span>
                            <img src={Groups} alt="profilepic" />  
                        </span>
                        <div className="countsOut">
                            <h2>{gcount}</h2>
                            <p>Groups</p>
                        </div>   
                    </Grid>
                    <Grid item xs={3} className="alPostRight">
                        {/* <Tooltip title="Add New Group" aria-label="add">
                            <Button style={{width:'auto'}} onClick={()=>history.push('/create-group')}>Create New Group</Button>
                        </Tooltip>     */}
                        
                    </Grid>
                </Grid>
                </div> 
                </Paper>
               
<Grid container spacing={3} className="listingItem topSpace">
<Grid item xs={6} >
<Paper className="sectionnBox" >
<h2>Groups:</h2>
<TextField id="standard-basic" className="myInput" placeholder="Search" 
    value={q2} 
    tabIndex="0"
    onChangeCapture={(e)=>setq2(e.target.value)} 
    /><br/><br/>
    <div>
    { (grp_data.length>0)?grp_data.map(g=>
    ( 
        <Box m={1} className="boxRow" >
        <div className="profilePicInner">
            <img src={process.env.PUBLIC_URL + `/uploads/${g.grp_img}`} alt="profilepic" />  
        </div>
        <div className="boxData">
            <Box className="selectGroup">
                <Typography className="userName" >{g.group_name}</Typography>
            </Box>    
        </div>
        <div className="arrowLInk" onClick={()=>history.push("/group/"+g.group_id)} >
            <ArrowForwardIosIcon />
        </div> 
        </Box>
        ))
        :<p className="text-center">No data found</p>
        }
    </div>
</Paper>
</Grid>
<Grid item xs={6} >

<Grid container spacing={4} style={{marginTop:'10px',marginBottom:'10px'}}>
      <Grid item xs={6} >
            <Paper elevation={5} className="box-home2">
            <div className="btn-title" >    
               <h3  onClick={()=>history.push("/addstudent")}>Add Students</h3> 
            </div>
            </Paper>
      </Grid>
      <Grid item xs={6} >
            <Paper elevation={5} className="box-home2">
            <div className="btn-title" >    
            <h3 onClick={()=>history.push("/addteacher")}>Add Teachers</h3> 
            </div>
            </Paper>
      </Grid>
      <Grid item xs={6} >
            <Paper elevation={5} className="box-home2">
            <div className="btn-title" >    
            <h3 onClick={()=>history.push("/viewstudent")} >View Students</h3> 
            </div>
            </Paper>
      </Grid>
      <Grid item xs={6} >
            <Paper elevation={5} className="box-home2">
            <div className="btn-title" >    
            <h3 onClick={()=>history.push("/viewteacher")}>View Teachers</h3> 
            </div>
            </Paper>
      </Grid>
     
      
</Grid>      
</Grid>

             </Grid>
            </Container>    
        </div>



    </div>

    );
  }
  
  export default Dashboard1;
  