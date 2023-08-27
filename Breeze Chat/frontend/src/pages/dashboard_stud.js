
import React, {useEffect,useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {Grid, Box,Button } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import Top3 from './top3';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import UserPic from "../assets/images/userPic.jpg";
import GroupPic from "../assets/images/groupPic.jpg";
import Groups from "../assets/images/groups.svg";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import swal from 'sweetalert';
import { makePostRequest ,makeGetRequest} from "../util/utils";
import { FaEdit } from "react-icons/fa";
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Edit from "../assets/images/edit.svg";
import {Formik,Form} from 'formik';
import * as Yup from'yup';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import moment from 'moment/moment.js'

const validationSchema = Yup.object({
    
    fname:Yup.string().required('Required'),
    lname:Yup.string().required('Required'),
    contact:Yup.string().required('Required')
    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
    .max(10, 'phone no must be greater than or equal to 10 digits')
    .min(10, 'phone no must be contain 10 digits'),

})



function DashboardStud() {
   const history = useHistory();
   

    
    const[Sname,setSname]=useState('');
    const [open2,setOpen2]=useState(false);
    const[grp_data,setgrp_data]=useState([]);
    const[gcount,setgcount]=useState(0);
    const [q2, setq2] = useState('');
    const [MemberData, setMemberData] = useState([])
    const [open,setOpen]=useState(false);
    const [open1,setOpen1]=useState(false);
    const[fname,setfname]=useState('');
    const[lname,setlname]=useState('');
    const[course,setcourse]=useState('');
    const[cyear,setcyear]=useState('');
    const[contact,setcontact]=useState(''); 
    const[selectedFile,setSelectedFile]=useState('');
    const[selectedFile1,setSelectedFile1]=useState('');
    const[data,setdata]=useState([]);
    const [AssignmentData, setAssignmentData] = useState();
    const [download, setdownload] = useState('');
    const [AssignmentData1, setAssignmentData1] = useState();

    const handlechangeassg = (e) => {
        setAssignmentData(e.target.value)
      }

      const handlechangeassg1 = (e) => {
        setAssignmentData1(e.target.value)
      }

    const changeHandler = (event) => {
        console.log('data',event.target.files[0])
        setSelectedFile(event.target.files[0]);
    };

    const changeHandler1 = (event) => {
        console.log('data',event.target.files[0])
        setSelectedFile1(event.target.files[0]);
    };

    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };

    async function changeProfile() {

        if(selectedFile.name==null){
            swal("Warning","Profile is requird", "warning");
        }
        else{
        let bodyFormData = new FormData();
            bodyFormData.append("Profile",selectedFile);
            bodyFormData.append("id",localStorage.getItem("student_id"));
        makePostRequest("/change/profile/student", bodyFormData).then((response) => {
              if(response.data.status=="1") 
              {
                swal("Success","Profile Changed", "success");
                handleClose1()
                viewMember()
              }
              else
              {  
                swal("Error","Failed to create", "warning"); 
              }
            
        }).catch((err) => {
            swal("There was an error!", "more error details", "warning");
        });
      }  
    }
    
    async function Addfile() {

        if(selectedFile1.name==null){
            swal("Warning","File is requird", "warning");
        }
        else{
        let bodyFormData = new FormData();
            bodyFormData.append("Profile",selectedFile1);
            bodyFormData.append("stud_id",localStorage.getItem("student_id"));
            bodyFormData.append("assign_id",AssignmentData);
        makePostRequest("/submit/assignment", bodyFormData).then((response) => {
              if(response.data.status=="1") 
              {
                swal("Success","File Uploaded", "success");
                // handleClose1()
                // viewMember()
              }
              else
              {  
                swal("Error","Failed to create", "warning"); 
              }
            
        }).catch((err) => {
            swal("There was an error!", "more error details", "warning");
        });
      }  
    }

    async function onUpdate(e){
       
        let bodyFormData = new FormData();
                  bodyFormData.append("fname",fname);
                  bodyFormData.append("lname",lname);
                  bodyFormData.append("contact",contact);
                  bodyFormData.append("id",localStorage.getItem("student_id"));  
                 
                  makePostRequest("/update/student", bodyFormData).then((response) => {
                      if (response.data.status === "1") {
                          swal("Success","Profile Update Successfully", "success")
                          .then(function() {
                             setOpen(false) 
                            viewMember()
                           });

                        }else{  
                          swal("Error",response.data.message, "warning"); 
                        }
                      
                    }).catch((err) => {
                      swal("There was an error!", "more error details", "warning");
                    });
      }
      
   
    async function viewMember() {
        let bodyFormData = new FormData();
        makeGetRequest(`/view/studentbyid/`+localStorage.getItem("student_id"), bodyFormData).then((response) => {
            if(response.data.status === "1"){
                setMemberData(response.data.data[0]);
                setfname(response.data.data[0].student_fname)
                setlname(response.data.data[0].student_lname)
                setcontact(response.data.data[0].student_contact)
                setcourse(response.data.data[0].course)
                setcyear(response.data.data[0].cyear)
                setSname(response.data.data[0].student_fname+" "+response.data.data[0].student_lname)
                localStorage.setItem("userpic",response.data.data[0].s_img);
            }
            else{
                setMemberData([]);
            }  
            }).catch((err) => {
            swal("There was an error!", "more error details", "warning");
            });
    }

   
  

  //view group
async function viewgroup(){
    let bodyFormData = new FormData();
    makeGetRequest(`/view/group/stud?sid=${localStorage.getItem("student_id")}`, bodyFormData).then((response) => {
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

  
async function view_assigment_bystud(){
    let bodyFormData = new FormData();
    makeGetRequest(`/view/assignment2?course=${course}&cyear=${cyear}`, bodyFormData).then((response) => {
        if(response.data.status === "1") {
            setdata(response.data.data)
        }else{
            setdata([])
        }    
    }).catch((err) => {
      swal("There was an error!", "more error details", "warning");
    });
  }

  const data1 = data.map((item) => {
    return {
      title: item.ayear+" "+item.acourse+" => "+item.subject,
      date: item.date,
    };
  });
  
    
    let l2=q2.length

    useEffect(()=>{
     
     if(l2>0){
        saerchgroup()
     }else{
        viewgroup();
     }

     view_assigment_bystud();
     viewMember();
    
    },[l2,course,cyear])


    const initialValues = {
        fname:fname,
        lname:lname,
        contact:contact,
        }

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
                        {
                            (MemberData.s_img=="null")?<img src={GroupPic} alt="profilepic" />
                            :<img src={process.env.PUBLIC_URL + `/uploads/${MemberData.s_img}`} />  
                        }      
                    </div>
                    <div className="instituteName">
                        <h1>{Sname}</h1>
                        <p>Student</p>
                    </div> 
                    </Grid>
                    <Grid item xs={6} className="alPostMid">
                        
                        
                        <span>
                            <img src={Groups} alt="profilepic" />  
                        </span>
                        <Divider orientation="vertical" flexItem />
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
<br/>
<Paper className="myPaper" >
                <div className="innerSpace fillWidth">
                
                <h2>Download Assignment:</h2>
                <Grid item xs={6}>
                    <TextField
                            value={AssignmentData1}
                            onChange={handlechangeassg1}
                            select
                            placeholder='Select Assignment to download '
                            label="Select Assignment to download"
                            fullWidth
                        >
                            {(data.length>0)?data.map(c=>    
                            (<MenuItem value={c.aid} onClick={()=>setdownload(c.attachment)}>{c.subject}</MenuItem> 
                            ))
                            :<p className="text-center">No data found</p>
                            }
                    </TextField>
                    </Grid>
                    <Grid item xs={6}>
                     <Button><a href = {process.env.PUBLIC_URL + `/uploads/${download}`} target = "_blank">Download Assignment</a></Button>   
                    </Grid>            
                 

                </div> 
                </Paper>
                <br/>
                <Paper className="myPaper" >
                <div className="innerSpace fillWidth">
                <Grid item xs={12}>
                <h2>View Assignment:</h2>
                <Grid container spacing={3}>
                    
                    <Grid item xs={3}>
                    <TextField
                            value={AssignmentData}
                            onChange={handlechangeassg}
                            select
                            placeholder='Select Assignment '
                            label="Select Assignment"
                            fullWidth
                        >
                            {(data.length>0)?data.map(c=>    
                            (<MenuItem value={c.aid}>{c.subject}</MenuItem> 
                            ))
                            :<p className="text-center">No data found</p>
                            }
                    </TextField>
                    </Grid>
                    <Grid item xs={3}>
                    <TextField className="boxRow myInput" type="file" name="file"  onChange={changeHandler1} />
                    </Grid>
                    <Grid item xs={3}>
                    <Button onClick={()=>Addfile()}>Submit</Button>
                    </Grid>  
                    <Grid item xs={3}>
                    <Button className="alPostRight" onClick={()=>handleClickOpen2()}>View Calender</Button>
                    </Grid>
                </Grid>
                </Grid>

                </div> 
                </Paper>
               
<Grid container spacing={3} className="listingItem topSpace">
<Grid item xs={6}>
<Paper className="sectionnBox" >
<Box className=" popupSpace memberDetails noSpaceSide">
                        <Box className="profilePicInner" onClick={()=>handleClickOpen1()} >
                            <Badge
                            overlap="circle"
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                            }}
                            badgeContent={<FaEdit style={{color:'gray'}} />}
                            >
        {
            (MemberData.s_img=="null")?  <Avatar style={{height:'90px', width:'90px'}}  src={UserPic} />
            :  <Avatar style={{height:'90px', width:'90px'}} src={process.env.PUBLIC_URL + `/uploads/${MemberData.s_img}`}  />
        }
      
                            </Badge>
                        </Box>
                        <h3 className="noLink" >{MemberData.student_fname} {MemberData.student_lname}</h3>
                        <h4 className="bottSpace">{localStorage.getItem('institutename')}</h4>
                        <Box className="memberDetailsCount">
                            <Box className="countsBox">
                               
                            </Box>
                        </Box>
                        <Box className="profileDetails">
                            <Box className="editOut" >
                                <Button className='editButton' onClick={()=>handleClickOpen()}>
                                    <img src={Edit} alt="Edit Group" />
                                </Button>
                            </Box>
                            <List>
                                <ListItem>
                                    <label>Name</label>
                                    <span>{MemberData.student_fname} {MemberData.student_lname}</span>
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
                                    <span>{MemberData.student_email}</span>
                                </Grid>
                                </Grid>
                                </ListItem>
                                <ListItem>
                                    <label>Mobile Number</label>
                                    <span>{MemberData.student_contact}</span>
                                </ListItem>
                            </List>    
                        </Box>
                    </Box>
                    </Paper>
</Grid>

<Grid item xs={6}>
    <Paper className="sectionnBox" >
    <Grid container spacing={3}>
    <Grid item xs={6} >
        <h2 className="noTopMar">All Groups</h2>
    </Grid>
    <Grid item xs={6} >
        {/* <Button className="alPostRight" onClick={()=>history.push("/create-group")}>Create Group</Button> */}
    </Grid>
</Grid>
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
                <Typography className="userName" >{g.group_name} <br/><Typography className="grName">{g.group_decp}</Typography></Typography>
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
             </Grid>
            </Container>    
        </div>
<Dialog maxWidth='md' fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <Box className="dialogSpace">  
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <IconButton aria-label="close" onClick={handleClose} className="modalClose">
                <CloseIcon />
                </IconButton>
                <h2>Update Profile</h2>  
                    
           
        </DialogTitle>
        <DialogContent >
        <Box className="listingSCroll">
        <Formik 
        enableReinitialize
        initialValues={initialValues} 
        validationSchema={validationSchema} 
        onSubmit={onUpdate}
    >
    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
            <Form>
           <Grid container spacing={3}>
           <Grid item xs={12}>
                <TextField label="Enter first name" className="myInput" 
                    value={values.fname}
                    onChange={handleChange("fname")}
                    onBlur={() => setFieldTouched("fname")}
                    onChangeCapture={(e) => (setfname(e.target.value))}
                   />
                   {errors.fname && touched.fname ? <div className="errmsg">{errors.fname}</div> : null}
            </Grid>
            <Grid item xs={12}>
                <TextField  label="Enter last name" className="myInput"   
                    value={values.lname}
                    onChange={handleChange("lname")}
                    onBlur={() => setFieldTouched("lname")}
                    onChangeCapture={(e) => (setlname(e.target.value))}
                   />
                   {errors.lname && touched.lname ? <div className="errmsg">{errors.lname}</div> : null}
            </Grid>
        
            <Grid item xs={12}>
            <TextField label="Enter mobile number" className="myInput"
                    value={values.contact}
                    onChange={handleChange("contact")}
                    onBlur={() => setFieldTouched("contact")}
                    onChangeCapture={(e) => (setcontact(e.target.value))}
                   />
                   {errors.contact && touched.contact ? <div className="errmsg">{errors.contact}</div> : null}
            </Grid>     
            {/* <Grid item xs={12}>
                        <p>Profile </p>
                        <input type="file" name="file"  onChange={changeHandler} /> 
            </Grid> */}
            <Grid item xs={12} className="centerText buttonSpace">
                <Button type="submit" variant="contained" color="primary" > Update Profile</Button>
            </Grid>
        </Grid>
        </Form>
    )}
    </Formik>
  
        </Box>
        </DialogContent>
        </Box> 
</Dialog>
<Dialog maxWidth='md' fullWidth onClose={handleClose1} aria-labelledby="customized-dialog-title" open={open1}>
        <Box className="dialogSpace">  
        <DialogTitle id="customized-dialog-title" onClose={handleClose1}>
        <IconButton aria-label="close" onClick={handleClose1} className="modalClose">
        <   CloseIcon />
        </IconButton>
                <h2>Update Profile Picture</h2>  
        </DialogTitle>
        <DialogContent >
        <Box className="listingSCroll">
        <Grid container spacing={3}>
        <Grid item xs={6}>
        {
            (MemberData.s_img=="null")?<img src={GroupPic} alt="profilepic" height="250px"  />
            :<img src={process.env.PUBLIC_URL + `/uploads/${MemberData.s_img}`} alt={UserPic} height="250px" />  
        }  
            {/* <img src={process.env.PUBLIC_URL + `/uploads/${MemberData.s_img}`} alt={UserPic} height="250px"  />  */}
        </Grid>
        <Grid item xs={6}>
            <br/><br/>
            <h3>Change Profile </h3>
            <br/>
            <input type="file" name="file"  onChange={changeHandler} /> <br/><br/>
            <button onClick={()=>changeProfile()}>Change</button>
        </Grid>
        </Grid>    
        </Box>
        </DialogContent>
        </Box> 
</Dialog>

<Dialog maxWidth='md' fullWidth onClose={handleClose2} aria-labelledby="customized-dialog-title" open={open2}>
    <div className='calender'>
      <FullCalendar 
        plugins={[dayGridPlugin]}
        interactionPlugin
        initialView="dayGridMonth"
        weekends={true}
        showNonCurrentDates={false} 
        firstDay={false}
        events={data1}

        
     />
    </div>   
    
    
   
</Dialog>
    </div>

    );
  }
  
  export default DashboardStud;
  