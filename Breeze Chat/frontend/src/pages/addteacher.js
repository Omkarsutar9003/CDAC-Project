
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


const validationSchema = Yup.object({
    fname:Yup.string().required('Required'),
    lname:Yup.string().required('Required'),
    email:Yup.string().email().required('Required'),
    contact:Yup.string().required('Required')
    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
    .max(10, 'phone no must be greater than or equal to 10 digits')
    .min(10, 'phone no must be contain 10 digits'),
    
})

const initialValues = {
    email:'',
    fname:'',
    lname:'',
    contact:'',
}

export default function AddTeacher() {
   const history = useHistory();
   
    const [open,setOpen]=useState(false);
    const[fname,setfname]=useState('');
    const[lname,setlname]=useState('');
    const[email,setemail]=useState('');
    const[contact,setcontact]=useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        history.push("/dashboard")
    };

    async function SendMail(e){
    
        let bodyFormData = new FormData();
            bodyFormData.append("Iname",localStorage.getItem("Lname"));
            bodyFormData.append("email",email);
            bodyFormData.append("name",fname+" "+lname);
            bodyFormData.append("password",contact);
            makePostRequest("/password/mail/teacher", bodyFormData).then((response) => {
                if (response.data.status === "1") {
                    console.log("send")    
                    history.push("/dashboard") 
                }else{  
                    swal("Error",response.data.message, "warning"); 
                }
                
            }).catch((err) => {
                swal("There was an error!", "more error details", "warning");
            });
      }

      async function onSubmit(e){
    
        let bodyFormData = new FormData();
                  bodyFormData.append("teacher_fname",fname);
                  bodyFormData.append("teacher_lname",lname);
                  bodyFormData.append("teacher_email",email);
                  bodyFormData.append("teacher_password",contact);
                  bodyFormData.append("teacher_contact",contact);
                  bodyFormData.append("institute_id",localStorage.getItem("institute_id"));
                  makePostRequest("/add/teacher", bodyFormData).then((response) => {
                      if (response.data.status === "1") {
                          swal("Success","Teacher Added Successfully", "success").then(()=>{
                              setOpen(false);
                              SendMail();
                          })
                        }else{  
                          swal("Error",response.data.message, "warning"); 
                        }
                      
                    }).catch((err) => {
                      swal("There was an error!", "more error details", "warning");
                    });
      }

      useEffect(()=>{
        handleClickOpen()
      },[])  


return(
    <Dialog maxWidth='md' fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
<Box className="dialogSpace">  
    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <IconButton aria-label="close" onClick={handleClose} className="modalClose">
        <CloseIcon />
        </IconButton>
            <h1>{localStorage.getItem("Lname")}</h1>
            <h2>Add Teacher</h2>  
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
)  


}