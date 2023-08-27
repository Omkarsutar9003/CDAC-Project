import React,{useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import Footer from "./footer";
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import swal from "sweetalert";
import { makePostRequest } from "../util/utils";
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



const validationSchema = Yup.object({
	email:Yup.string().required('Required'),
    password:Yup.string().required('Required')
})

const initialValues = {
	email:'',
	password:'',	
}
const validationSchema1 = Yup.object({
  password:Yup.string().required('Required'),
  password1: Yup.string().required('Please confirm the password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match') 
})

const initialValues1 = {

	password:'',
  password1:'',	
}
function Signinstud() {

    const history = useHistory();

    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');
    const[password1,setpassword1]=useState('');

    const [open, setOpen] = React.useState(false);
   const handleClickOpen1= () => {
       setOpen(true);  
   };

   const handleClose = () => {
    setOpen(false);
   };
   async function sendpassword(e){
    
    let bodyFormData = new FormData();
        bodyFormData.append("email",email);
        makePostRequest("/password/send/stud", bodyFormData).then((response) => {
            if (response.data.status === "1") {
              swal("Success","Please Check Mail Box", "success").then(()=>{
                handleClose()
              }) 
            }else{  
                swal("Error",response.data.message, "warning"); 
            }
            
        }).catch((err) => {
            swal("There was an error!", "more error details", "warning");
        });
  }

function onSubmit(){
    let bodyFormData = new FormData();
    bodyFormData.append("email",email);
    bodyFormData.append("password",password);
    makePostRequest("/login/student", bodyFormData).then((response) => {
        if (response.data.status === "1") {
            swal("Success","Student Login Successfully", "success");
            localStorage.setItem("logintype","student");
            localStorage.setItem("institute_id",response.data.data[0].institute_id);
            localStorage.setItem("student_id",response.data.data[0].student_id);
            localStorage.setItem("userpic",response.data.data[0].s_img);
            localStorage.setItem("Lname",response.data.data[0].student_fname+" "+response.data.data[0].student_lname);
            history.push("/student/dashboard")
          }else if(response.data.status === "3"){  
            swal("Alert",response.data.message, "warning").then(()=>{
              handleClickOpen9(email)
            }) 
          }else {  
            swal("Error",response.data.message, "warning"); 
          }
        
      }).catch((err) => {
        swal("There was an error!", "more error details", "warning");
      });
}

const [open9, setOpen9] = React.useState(false);
   const handleClickOpen9= (email) => {
       setOpen9(true);  
   };
   const handleClose9 = () => {
       setOpen9(false);
   };
async function reset_password(){
  let bodyFormData = new FormData();
  bodyFormData.append("email",email);
  bodyFormData.append("password1",password1);
  makePostRequest("/update/password/student", bodyFormData).then((response) => {
      if (response.data.status === "1") {
          swal("Success","Student Verify Successfully", "success");
         handleClose9();
        }else if(response.data.status === "3"){  
          swal("Error",response.data.message, "warning").then(()=>{
          }) 
        }else {  
          swal("Error",response.data.message, "warning"); 
        }
      
    }).catch((err) => {
      swal("There was an error!", "more error details", "warning");
    });



}
	
    return (
       <div className="plashBox">
           <div className="mainBoxInner">
           <Container maxWidth="md">
                 <Paper spacing={3} className="plashPaper" >
                    <div className="plashInner">
                    <h1>Student Login</h1>
					<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
					<Form>
                    <TextField  label="Enter email address" className="myInput"  
                    value={values.email}
                    onChange={handleChange("email")}
                    onBlur={() => setFieldTouched("email")}
                    onChangeCapture={(e) => (setemail(e.target.value))}
                   />
                   {errors.email && touched.email ? <div className="errmsg">{errors.email}</div> : null}
                    <TextField type="password" label="Enter password" className="myInput"
                     value={values.password}
                     onChange={handleChange("password")}
                     onBlur={() => setFieldTouched("password")}
                     onChangeCapture={(e) => (setpassword(e.target.value))}
                    />
                    {errors.password && touched.password ? <div className="errmsg">{errors.password}</div> : null}
                    <Button variant="contained" color="primary" type="submit" className="buttBottomSpace">
                        Sign In
                    </Button>
                    </Form>
          					)}
            				</Formik>
                    <p className="forgottPassword" onClick={()=>handleClickOpen1()} >Forgot Password?</p>
                     </div>
                </Paper>
            </Container>    
           </div>
       <Footer/>
       <Dialog maxWidth='md' onClose={handleClose9} aria-labelledby="customized-dialog-title" open={open9}>
            <IconButton aria-label="close" onClick={handleClose9} className="modalClose">
               <CloseIcon />
            </IconButton>
            <div className="dialogSpace textCenter">
            <Container maxWidth="md">
                 <Paper spacing={3} className="plashPaper" >
                    <div className="plashInner">
                    <h1>Change Password For Login</h1>
					<Formik initialValues={initialValues1} validationSchema={validationSchema1} onSubmit={reset_password}>
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
					<Form>
                    <TextField type="password" label="Enter New Password" className="myInput"
                     value={values.password}
                     onChange={handleChange("password")}
                     onBlur={() => setFieldTouched("password")}
                     onChangeCapture={(e) => (setpassword(e.target.value))}
                    />

                    <TextField type="password" label="Confirm Password" className="myInput"
                     value={values.password1}
                     onChange={handleChange("password1")}
                     onBlur={() => setFieldTouched("password1")}
                     onChangeCapture={(e) => (setpassword1(e.target.value))}
                    />

                    {errors.password1 && touched.password1 ? <div className="errmsg">{errors.password1}</div> : null}
                    <Button variant="contained" color="primary" type="submit" className="buttBottomSpace">
                      Change Password
                    </Button>
                    </Form>
          					)}
            				</Formik>
                    </div>
                </Paper>
            </Container>
            </div>
        </Dialog>
        <Dialog maxWidth='md' onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <IconButton aria-label="close" onClick={handleClose} className="modalClose">
               <CloseIcon />
            </IconButton>
            <div className="dialogSpace textCenter">
            <Container maxWidth="md">
                 <Paper spacing={3} className="plashPaper" >
                    <div className="plashInner">
                    <h1>Forgot Password</h1>
					
                    <TextField type="text" label="Enter Email Address" className="myInput"
                     value={email}
                     onChangeCapture={(e) => (setemail(e.target.value))}
                    />

                   <Button variant="contained" onClick={()=>sendpassword()} className="buttBottomSpace">
                      Send Password 
                    </Button>
                    </div>
                </Paper>
            </Container>
            </div>
        </Dialog>
       </div>

    );
  }
  
  export default Signinstud;
  