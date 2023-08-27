
import React, {useEffect, useState,useRef} from 'react';
//import moment from 'moment/moment.js'
import Paper from '@material-ui/core/Paper';
import { Button, Tooltip,Grid, Box,TextField } from "@material-ui/core";
import Container from '@material-ui/core/Container';

import MemberIcon from "../assets/images/memberIcon.svg";
import moment from 'moment/moment.js'
import dateFormat, { masks } from "dateformat";
import { useHistory,useParams } from "react-router-dom";
// import Footer from "./footer";
import Top3 from './top3';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { Typography } from '@material-ui/core';
import AttachmentIcon from '@material-ui/icons/Attachment';
import UserPic from "../assets/images/userPic.jpg";
import GroupPic from "../assets/images/groupPic.jpg";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import swal from 'sweetalert';
import { makePostRequest ,makeGetRequest} from "../util/utils";
import {Formik,Form} from 'formik';
import * as Yup from'yup';

const validationSchema = Yup.object({
	msg:Yup.string().trim().required('Required'),

})

const initialValues = {
	msg:'',
}

function Group() {
   const history = useHistory();
   const[open,setOpen]=useState(false);
   const[grp_data,setgrp_data]=useState([]);
   const[stud_data,setstud_data]=useState([]);
   const[studcount,studsetcount]=useState(0);
   const[q, setq] = useState('');
   const[stud_data1,setstud_data1]=useState([]);
   const[q2, setq2] = useState('');
   const[admin_name,setadmin]=useState('')
   const[msg,setmsg]=useState('')
   const[msg_data,setmsg_data]=useState([])
   const[cyear,setcyear]=useState('')
   const[course,setcourse]=useState('')
   const[sid,setsid]=useState(0);
   const[open9, setOpen9]=useState(false);

   const handleClickOpen9= (sid) => {
       setOpen9(true);
        setsid(sid);
       //Delete(iid);
   };
   const handleClose9 = () => {
       setOpen9(false);
   };
   


   const {gid}=useParams() 

   async function view_chat(){
    let bodyFormData = new FormData();
    makeGetRequest(`/view/chat?gid=${gid}&iid=${localStorage.getItem("institute_id")}`, bodyFormData).then((response) => {
        if(response.data.status === "1") {
            setmsg_data(response.data.data)
        }else{
            setmsg_data([])
        }    
    }).catch((err) => {
      swal("There was an error!", "more error details", "warning");
    });
  }



   async function sendmsg(){
    let bodyFormData = new FormData();
    if(localStorage.getItem("logintype")=="teacher"){
        bodyFormData.append("msg",msg);
        bodyFormData.append("g_id",gid);
        bodyFormData.append("s_id","0");
        bodyFormData.append("t_id",localStorage.getItem("teacher_id"))
        bodyFormData.append("m_name",localStorage.getItem("Lname"))
        bodyFormData.append("i_id",localStorage.getItem("institute_id"));
    }else if(localStorage.getItem("logintype")=="student"){
        bodyFormData.append("msg",msg);
        bodyFormData.append("g_id",gid);
        bodyFormData.append("s_id",localStorage.getItem("student_id"));
        bodyFormData.append("m_name",localStorage.getItem("Lname"))
        bodyFormData.append("t_id","0")
        bodyFormData.append("i_id",localStorage.getItem("institute_id"));
    }else{
        bodyFormData.append("msg",msg);
        bodyFormData.append("g_id",gid);
        bodyFormData.append("s_id","0");
        bodyFormData.append("m_name",localStorage.getItem("Lname"))
        bodyFormData.append("t_id","0")
        bodyFormData.append("i_id",localStorage.getItem("institute_id"));
    }
    
    makePostRequest("/send/message", bodyFormData).then((response) => {
        if (response.data.status === "1") {
            setmsg('')
           view_chat();
        }else{  
            swal("Error",response.data.message, "warning"); 
        }
        
    }).catch((err) => {
        swal("There was an error!", "more error details", "warning");
    });

   }

   async function remove_stud(){
        let bodyFormData = new FormData();
        bodyFormData.append("gid",gid);
        bodyFormData.append("sid",sid);
    makePostRequest("/remove/student", bodyFormData).then((response) => {
        if (response.data.status === "1") {
           swal("Success",response.data.message, "success"); 
           viewstudent()
           viewstudent1()
           handleClose9()
        }else{  
            swal("Error",response.data.message, "warning"); 
        }
        
    }).catch((err) => {
        swal("There was an error!", "more error details", "warning");
    });


   }


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

 //view student added
 async function viewstudent (){
    let bodyFormData = new FormData();
    makeGetRequest(`/added/group?gid=${gid}`, bodyFormData).then((response) => {
        if(response.data.status === "1") {
            setstud_data(response.data.data)
            studsetcount(response.data.gcount)
        }else{
            setstud_data([])
        }    
    }).catch((err) => {
      swal("There was an error!", "more error details", "warning");
    });
  }

  //search student added
  async function saerchstudent(){
    let bodyFormData = new FormData();
    makeGetRequest(`/addedsearch/group?find=${q}&gid=${gid}`, bodyFormData).then((response) => {
        if(response.data.status === "1") {
            setstud_data(response.data.data)
        }else{
            setstud_data([])
        }    
    }).catch((err) => {
      swal("There was an error!", "more error details", "warning");
    });
  }




    async function viewgroupbyid(){
        let bodyFormData = new FormData();
        makeGetRequest(`/view/groupbyid?id=${gid}`, bodyFormData).then((response) => {
            if(response.data.status === "1") {
                setgrp_data(response.data.data[0])
                setadmin(response.data.data[0].teacher_fname+" "+response.data.data[0].teacher_lname)
                setcyear(response.data.data[0].year)
                setcourse(response.data.data[0].course)
            }else{
                setgrp_data([])
            }    
        }).catch((err) => {
          swal("There was an error!", "more error details", "warning");
        });
      }


      //view student not added  &cyear=${cyear}&course=${course}
 async function viewstudent1(){
    let bodyFormData = new FormData();
        // bodyFormData.append("course",course);
        // bodyFormData.append("cyear",cyear);
    makeGetRequest(`/notadded/group?gid=${gid}&iid=${localStorage.getItem("institute_id")}&cyear=${cyear}&course=${course}`, bodyFormData).then((response) => {
        if(response.data.status === "1") {
            setstud_data1(response.data.data)
        }else{
            setstud_data1([])
        }    
    }).catch((err) => {
      swal("There was an error!", "more error details", "warning");
    });
  }

  //search student not added
  async function searchstudent1(){
    let bodyFormData = new FormData();
    makeGetRequest(`/nonaddedsearch/group?find=${q2}&gid=${gid}&iid=${localStorage.getItem("institute_id")}`, bodyFormData).then((response) => {
        if(response.data.status === "1") {
            setstud_data1(response.data.data)
        }else{
            setstud_data1([])
        }    
    }).catch((err) => {
      swal("There was an error!", "more error details", "warning");
    });
  }

  const addstudent = (sid) => {
   
    let bodyFormData = new FormData();
        bodyFormData.append("gid",grp_data.group_id);
        bodyFormData.append("sid",sid);
        bodyFormData.append("iid",localStorage.getItem("institute_id"));
        makePostRequest("/add/student/group", bodyFormData).then((response) => {
            if (response.data.status === "1") {
                viewstudent();
                viewstudent1();
                handleClickOpen();
            }else{  
                swal("Error",response.data.message, "warning"); 
            }
            
        }).catch((err) => {
            swal("There was an error!", "more error details", "warning");
        });
      }


    let l=q.length
    let l1=q2.length

    // const messagesEndRef = useRef(null);
    // const scrollToBottom = () => {
    //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    // };
  

   
    useEffect(()=>{

    if(l>0){
        saerchstudent()
        }else{
        viewstudent();
        }
            if(l1>0){
            searchstudent1()
            }else{
            viewstudent1()
            }
    viewgroupbyid()
    view_chat();
   },[l,l1,course,cyear])

 
    
  
   
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
                        <img src={process.env.PUBLIC_URL + `/uploads/${grp_data.grp_img}`} alt={UserPic} />            
                    </div>
                    <div className="instituteName">
                        <h1>{grp_data.group_name}</h1>
                        <p>{grp_data.group_decp}</p>
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
                       
                          
                    </Grid>
                    <Grid item xs={3} className="alPostRight">
                        {
                            (localStorage.getItem("logintype")=="teacher" || localStorage.getItem("logintype")=="institute" )?
                            <>
                            <Tooltip title="Add Member" aria-label="add">
                            <Button style={{width:'auto'}} onClick={handleClickOpen}>Add Member</Button>
                            </Tooltip>&nbsp;
                            <Button style={{width:'auto'}} onClick={()=>history.goBack()}>Back</Button>
                             </>
                            :<div><Button style={{width:'auto'}} onClick={()=>history.goBack()}>Back</Button></div>
                        }
                           
                        
                    </Grid>
                </Grid>
                </div> 
                </Paper>
               
<Grid container spacing={3} className="listingItem topSpace">
<Grid item xs={3} >
<Paper className="sectionnBox" >
    <h2 className="noTopMar">Group Members</h2>
    <Typography className="admin_name">Admin: {admin_name}</Typography>
    <TextField id="standard-basic" className="myInput" placeholder="Search"
     value={q} 
     tabIndex="0"
     onChangeCapture={(e)=>setq(e.target.value)} 
    /><br/><br/>
 { (stud_data.length>0)?stud_data.map(s=>
    ( 
    <Box m={1}  className="boxRow">
        <div className="profilePicInner">
        {
            (s.s_img=="null")?<img src={GroupPic} alt="profilepic" height="250px"  />
            :<img src={process.env.PUBLIC_URL + `/uploads/${s.s_img}`} alt="UserPic" height="250px" />  
        }            
        </div>
        <div className="boxData">
            <Box className="selectGroup">
                <Typography className="userName" >{s.student_fname} {s.student_lname}</Typography>
            </Box>    
        </div>
        <div className="arrowLInk" onClick={()=>handleClickOpen9(s.student_id)} >
            <ArrowForwardIosIcon />
        </div>
    </Box>
  ))
  :<p className="text-center">No data found</p>
  }
</Paper>
</Grid>



<Grid item xs={9}>
<Paper className="sectionnBox" >
<h2 className="noTopMar">Chat Box</h2>
<Divider />
<div className="direct-chat-messages">    
<ul id="chat">
{ (msg_data.length>0)?msg_data.map(m=>
    ( 
    <>    

{ (localStorage.getItem("Lname")==m.m_name)?
    <li class="me">
        <div class="entete">
            <div class="message">
                {m.msg}
            </div><br/>
                <span class="status blue"></span>
                <h2>{m.m_name}</h2><br/>
                {/* <h2>{moment.utc(m.msg_date).format("HH:MM")} | {moment(m.msg_date).format("MMM Do YY")}</h2> */}
               <h2>{dateFormat(m.msg_date, "dddd, mmmm dS, yyyy, h:MM TT")}</h2> 
        </div>
    </li>
    :
    <li class="you">
          <div class="entete">
          <div class="message">
            {m.msg}
          </div><br/>
            <span class="status green"></span>
            <h2>{m.m_name}</h2><br/>
            {/* <h2>{moment.utc(m.msg_date).format("HH:MM")} | {moment(m.msg_date).format("MMM Do YY")}</h2> */}
            <h2>{dateFormat(m.msg_date, "h:MM TT, dddd, mmmm dS, yyyy")}</h2> 
          </div>
          {/* <div class="triangle"></div> */}
        </li>
}
            
</>      
    ))
    :<p className="text-center">No Messages </p>
    }
 </ul>   
 {/* <div ref={messagesEndRef} />  */}
</div>
<Divider />

<Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema} 
        onSubmit={sendmsg}
    >
    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
            <Form>
<Grid container style={{padding: '20px'}}>
    <Grid item xs={9}>
        <TextField id="outlined-basic-email" label="Type Something" fullWidth 
         value={values.msg}
         onChange={handleChange("msg")}
         onBlur={() => setFieldTouched("msg")}
         onChangeCapture={(e) => (setmsg(e.target.value))}
        
        />
    </Grid>
    <Grid xs={2} align="right">
    <Fab color="primary" onClick={handleSubmit} ><SendIcon/></Fab>
    </Grid>
    </Grid>
    </Form>
    )}
    </Formik>    
</Paper> 



    </Grid>
</Grid>
</Container>    
</div>


<Dialog maxWidth='md' fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <Box className="dialogSpace">  
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <IconButton aria-label="close" onClick={handleClose} className="modalClose">
                <CloseIcon />
                </IconButton>
                <h1>{grp_data.group_name}</h1>
                <h2>Add Student</h2>  
                    
           
        </DialogTitle>
        <DialogContent >
        <TextField id="standard-basic" label="Search" className="myInput bottSpace"
         value={q2} 
         tabIndex="0"
         onChangeCapture={(e)=>setq2(e.target.value)} 
        />
        <Box className="listingSCroll">        

        <Typography className="viewAll" >All Members </Typography>
        { (stud_data1.length>0)?stud_data1.map(s=>
    ( 
            <Box m={1}  className="boxRow">
                    <div className="profilePicInner">
        {
            (s.s_img=="null")?<img src={GroupPic} alt="profilepic" height="250px"  />
            :<img src={process.env.PUBLIC_URL + `/uploads/${s.s_img}`} alt="UserPic" height="250px" />  
        }          
                    </div>
                    <div className="boxData">
                        <Box className="selectGroup">
                            <Typography className="userName" onClick={()=>addstudent(s.student_id)} >{s.student_fname}  {s.student_lname}</Typography>
                        </Box>    
                    </div>
                    <div className="arrowLInk" onClick={()=>addstudent(s.student_id)} >
                        <ArrowForwardIosIcon />
                    </div>
                    
            </Box>
            ))
  :<p className="text-center">No data found</p>
  }
        </Box>
        </DialogContent>
        </Box> 
</Dialog>
{(localStorage.getItem("logintype")=="student")? <></>
:
<Dialog maxWidth='md' onClose={handleClose9} aria-labelledby="customized-dialog-title" open={open9}>
            <IconButton aria-label="close" onClick={handleClose9} className="modalClose">
               <CloseIcon />
            </IconButton>
            <div className="dialogSpace">
            <div className="btn_options">
                <button className="button_option" onClick={()=>history.push("/profile/student/"+sid)}>Profile</button>
                <button className="button_option" onClick={()=>remove_stud()}>Remove</button>
            </div>   
            </div>
</Dialog>
}


</div>

    );
  }
  
  export default Group;
  