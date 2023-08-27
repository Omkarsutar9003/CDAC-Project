
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
import { makePostRequest } from "../util/utils";


const validationSchema = Yup.object({
    fname:Yup.string().required('Required'),
    lname:Yup.string().required('Required'),
    email:Yup.string().email().required('Required'),
    contact:Yup.string().required('Required')
    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
    .max(10, 'phone no must be greater than or equal to 10 digits')
    .min(10, 'phone no must be contain 10 digits'),
    password:Yup.string().required('Please Enter your password').matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
    cpassword:Yup.string()
    .equals([Yup.ref("password")], "password doesn't match")
    .required('This is required'),
    
})

const initialValues = {
    email:'',
    password:'',
    cpassword:'',
    fname:'',
    lname:'',
    contact:'',
}

function AllPost() {
   const history = useHistory();
   
    const [open,setOpen]=useState(false);
    const[fname,setfname]=useState('');
    const[lname,setlname]=useState('');
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');
    const[cpassword,setcpassword]=useState('');
    const[contact,setcontact]=useState('');

   const handleClickOpen = () => {
       setOpen(true);
   };
   const handleClose = () => {
       setOpen(false);
   };


   async function onSubmit(e){
    
      let bodyFormData = new FormData();
                bodyFormData.append("teacher_fname",fname);
                bodyFormData.append("teacher_lname",lname);
                bodyFormData.append("teacher_email",email);
                bodyFormData.append("teacher_password",password);
                bodyFormData.append("teacher_contact",contact);
                bodyFormData.append("institute_id",'1');
                makePostRequest("/add/teacher", bodyFormData).then((response) => {
                    if (response.data.status === "1") {
                        swal("Success","Teacher Registration Successfully", "success");
                      }else{  
                        swal("Error",response.data.message, "warning"); 
                      }
                    
                  }).catch((err) => {
                    swal("There was an error!", "more error details", "warning");
                  });
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
                        <img src={UserPic} alt="profilepic" />            
                    </div>
                    <div className="instituteName">
                        <h1>abcd</h1>
                        <p>abc</p>
                    </div> 
                    </Grid>
                    <Grid item xs={6} className="alPostMid">
                        <span>
                            <img src={MemberIcon} alt="profilepic" />  
                        </span>
                        <div className="countsOut">
                            <h2>20</h2>
                            <p>Members</p>
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <span>
                            <img src={Groups} alt="profilepic" />  
                        </span>
                        <div className="countsOut">
                            <h2>20</h2>
                            <p>Groups</p>
                        </div> 
                        <Divider orientation="vertical" flexItem />
                        <span>
                            <img src={Groups} alt="profilepic" />  
                        </span>
                        <div className="countsOut">
                            <h2>20</h2>
                            <p>Teachers</p>
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
<Grid item xs={4} >
<Paper className="sectionnBox" >
<Grid container spacing={3}>
    <Grid item xs={6} >
        <h3 className="noTopMar">All Student</h3>
    </Grid>
    <Grid item xs={6} >
        <Button className="alPostRight" onClick={()=>history.push("/addstudent")}>Add Student</Button>
    </Grid>
</Grid>
    
    <TextField id="standard-basic" className="myInput" placeholder="Search" /><br/><br/>
    <Box m={1}  className="boxRow">
        <div className="profilePicInner">
            <img src={GroupPic} alt="profilepic" />               
        </div>
        <div className="boxData">
            <Box className="selectGroup">
                <Typography className="userName" >student name</Typography>
            </Box>    
        </div>
        <div className="arrowLInk" onClick={()=>history.push("/group-details/")} >
            <ArrowForwardIosIcon />
        </div>
    </Box>
</Paper>
</Grid>

<Grid item xs={4} >
<Paper className="sectionnBox">
    <Grid container spacing={3}>
        <Grid item xs={6} >
            <h3 className="noTopMar">All Tearcher</h3>
        </Grid>
        <Grid item xs={6} >
            <Button className="alPostRight" onClick={handleClickOpen}>Add Tearcher</Button>
        </Grid>
    </Grid>

    <TextField id="standard-basic" className="myInput" placeholder="Search" /><br/><br/>
    <Box m={1}  className="boxRow">
        <div className="profilePicInner">
            <img src={GroupPic} alt="profilepic" />               
        </div>
        <div className="boxData">
            <Box className="selectGroup">
                <Typography className="userName" >Tearcher name</Typography>
            </Box>    
        </div>
        <div className="arrowLInk" onClick={()=>history.push("/group-details/")} >
            <ArrowForwardIosIcon />
        </div>
    </Box>
</Paper>
</Grid>

<Grid item xs={4}>
    <Paper className="sectionnBox" >
    <Grid container spacing={3}>
    <Grid item xs={6} >
        <h3 className="noTopMar">All Groups</h3>
    </Grid>
    <Grid item xs={6} >
        <Button className="alPostRight" onClick={()=>history.push("/create-group")}>Create Group</Button>
    </Grid>
</Grid>
    <TextField id="standard-basic" className="myInput" placeholder="Search" /><br/><br/>
    <div>
        <Box m={1} className="boxRow" >
        <div className="profilePicInner">
            <img src={GroupPic} alt="profilepic" />               
        </div>
        <div className="boxData">
            <Box className="selectGroup">
                <Typography className="userName" >yoga</Typography>
            </Box>    
        </div>
        <div className="arrowLInk" onClick={()=>history.push("/group")} >
            <ArrowForwardIosIcon />
        </div> 
        </Box>
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
            <h2>Institute Name</h2>
            <h1>Add Teacher</h1>  
    </DialogTitle>
<DialogContent >
<Box className="listingSCroll">
    <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema} 
        onSubmit={onSubmit}
    >
    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
            <Form>
           <Grid container spacing={3}>
            <Grid item xs={6}>
                <TextField label="Enter first name" className="myInput" 
                    value={values.fname}
                    onChange={handleChange("fname")}
                    onBlur={() => setFieldTouched("fname")}
                    onChangeCapture={(e) => (setfname(e.target.value))}
                   />
                   {errors.fname && touched.fname ? <div className="errmsg">{errors.fname}</div> : null}
            </Grid>
            <Grid item xs={6}>
                <TextField  label="Enter last name" className="myInput"   
                    value={values.lname}
                    onChange={handleChange("lname")}
                    onBlur={() => setFieldTouched("lname")}
                    onChangeCapture={(e) => (setlname(e.target.value))}
                   />
                   {errors.lname && touched.lname ? <div className="errmsg">{errors.lname}</div> : null}
            </Grid>
            <Grid item xs={6}>
                <TextField  label="Enter email address" className="myInput"
                    value={values.email}
                    onChange={handleChange("email")}
                    onBlur={() => setFieldTouched("email")}
                    onChangeCapture={(e) => (setemail(e.target.value))}
                   />
                   {errors.email && touched.email ? <div className="errmsg">{errors.email}</div> : null}
            </Grid>
            <Grid item xs={6}>
            <TextField label="Enter mobile number" className="myInput"
                    value={values.contact}
                    onChange={handleChange("contact")}
                    onBlur={() => setFieldTouched("contact")}
                    onChangeCapture={(e) => (setcontact(e.target.value))}
                   />
                   {errors.contact && touched.contact ? <div className="errmsg">{errors.contact}</div> : null}
            </Grid>
            <Grid item xs={6}>
            <TextField type="password"  label="Create password" className="myInput"
                    value={values.password}
                    onChange={handleChange("password")}
                    onBlur={() => setFieldTouched("password")}
                    onChangeCapture={(e) => (setpassword(e.target.value))}
                   />
                   {errors.password && touched.password ? <div className="errmsg">{errors.password}</div> : null}
            </Grid>
            <Grid item xs={6}>
            <TextField type="password"  label="Confirm password" className="myInput"
                    value={values.cpassword}
                    onChange={handleChange("cpassword")}
                    onBlur={() => setFieldTouched("cpassword")}
                    onChangeCapture={(e) => (setcpassword(e.target.value))}
                   />
                   {errors.cpassword && touched.cpassword ? <div className="errmsg">{errors.cpassword}</div> : null}
            </Grid>
            
            <Grid item xs={12} className="centerText buttonSpace">
                <Button type="submit" variant="contained" color="primary" > Add Teacher</Button>
            </Grid>
        </Grid>
        </Form>
        )}
    </Formik>
  
        </Box>
        </DialogContent>
        </Box> 
</Dialog>
    </div>

    );
  }
  
  export default AllPost;
  