
import React, {useEffect, useState} from 'react';
import { Button,Grid, Box,TextField } from "@material-ui/core";
import {Formik,Form} from 'formik';
import * as Yup from'yup';
import { useHistory,useParams } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';
import { makePostRequest } from "../util/utils";
import MenuItem from '@material-ui/core/MenuItem';




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

const course = [{course:'Science'},
                {course:'Art'},
                {course:'Commers'}];


const year = [{year:'First Year',y1:'FY'},
{year:'Second Year',y1:'SY'},
{year:'Third Year',y1:'TY'}];



    
function Addstud() {
    const history = useHistory();
  

    const [open,setOpen]=useState(false);
    const[fname,setfname]=useState('');
    const[lname,setlname]=useState('');
    const[email,setemail]=useState('');
    const[contact,setcontact]=useState(''); 
    const [value, setValue] = useState(course[0]);
    const [inputValue, setInputValue] = useState('');
    const [selectcourse, setselectcourse] = useState('');
    const [selectyear, setselectyear] = useState('');
    const handlechangecourse = (e) => {
        setselectcourse(e.target.value)
      }
    const handlechangeyear = (e) => {
        setselectyear(e.target.value)
      }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        history.goBack()
    };
    async function onSubmit(e){
    
        let bodyFormData = new FormData();
                  bodyFormData.append("student_fname",fname);
                  bodyFormData.append("student_lname",lname);
                  bodyFormData.append("student_email",email);
                  bodyFormData.append("student_contact",contact);
                  bodyFormData.append("course",selectcourse);
                  bodyFormData.append("year",selectyear);
                  bodyFormData.append("institute_id",localStorage.getItem("institute_id"));
                  makePostRequest("/add/student", bodyFormData).then((response) => {
                      if (response.data.status === "1") {
                          swal("Success","Student Registration Successfully", "success")
                          .then(function() {
                            SendMail() 
                            history.push("/dashboard")
                           });

                        }else{  
                          swal("Error",response.data.message, "warning"); 
                        }
                      
                    }).catch((err) => {
                      swal("There was an error!", "more error details", "warning");
                    });
      }

      async function SendMail(e){
    
        let bodyFormData = new FormData();
            bodyFormData.append("Iname",localStorage.getItem("Lname"));
            bodyFormData.append("email",email);
            bodyFormData.append("name",fname+" "+lname);
            bodyFormData.append("password",contact);
            makePostRequest("/password/mail/stud", bodyFormData).then((response) => {
                if (response.data.status === "1") {
                    console.log("send")     
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
   
   
    return (
<div className="plashBox">
<Dialog maxWidth='md' fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <Box className="dialogSpace">  
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <IconButton aria-label="close" onClick={handleClose} className="modalClose">
                <CloseIcon />
                </IconButton>
                <h1>{localStorage.getItem("institute_name")}</h1>
                <h2>Add New Student {selectcourse}</h2>  
                    
           
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
            <Grid  item xs={6}>
                <TextField
                    value={selectcourse}
                    onChange={handlechangecourse}
                    select
                    placeholder='Select Course'
                    label="Select Course"
                  fullWidth
                >
                {(course.length>0)?course.map(c=>    
                (<MenuItem value={c.course}>{c.course}</MenuItem> 
                ))
                :<p className="text-center">No data found</p>
                }
            </TextField>
           
            
            </Grid>
            <Grid  item xs={6}>
                <TextField
                    value={selectyear}
                    onChange={handlechangeyear}
                    select
                    placeholder='Select Year'
                    label="Select Year"
                    fullWidth
                >
                {(year.length>0)?year.map(c=>    
                (<MenuItem value={c.y1}>{c.year}</MenuItem> 
                ))
                :<p className="text-center">No data found</p>
                }
            </TextField>
           
            
            </Grid>    
            <Grid item xs={12} className="centerText buttonSpace">
                <Button type="submit" variant="contained" color="primary" > Add</Button>
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
  
  export default Addstud;
  