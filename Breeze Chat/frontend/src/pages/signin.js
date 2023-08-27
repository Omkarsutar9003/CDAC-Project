import React,{useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import Footer from "./footer";
import Top1 from '../top1';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import swal from "sweetalert";
import { makePostRequest } from "../util/utils";


const useStyles = makeStyles((theme)=>({
    formWrapper:{
      marginTop:theme.spacing(5),
      marginBottom:theme.spacing(8),
    },
  }));

const validationSchema = Yup.object({
	email:Yup.string().required('Required'),
    password:Yup.string().required('Required')
})

const initialValues = {
	email:'',
	password:'',	
}

function Signin() {
	const classes = useStyles();
    const history = useHistory();

    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');

function onSubmit(){
    let bodyFormData = new FormData();
    bodyFormData.append("email",email);
    bodyFormData.append("password",password);
    makePostRequest("/login/institute", bodyFormData).then((response) => {
        if (response.data.status === "1") {
            swal("Success","Institute Login Successfully", "success");
            localStorage.setItem("logintype","institute");
            localStorage.setItem("userpic",response.data.data[0].i_img);
            localStorage.setItem("institute_id",response.data.data[0].institute_id);
            localStorage.setItem("Lname",response.data.data[0].institute_name);
            localStorage.setItem("institute_email",response.data.data[0].institute_email);
            localStorage.setItem("institute_contact",response.data.data[0].institute_contact);
            history.push("/dashboard")
          }else{  
            swal("Error",response.data.message, "warning"); 
          }
        
      }).catch((err) => {
        swal("There was an error!!!", "more error details", "warning");
      });
}
	
    return (
       <div className="plashBox">
           <Top1 title="Register"/>
           <div className="mainBoxInner">
           <Container maxWidth="md">
                 <Paper spacing={3} className="plashPaper" >
                    <div className="plashInner">
                    <h1>Sign In</h1>
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
                    <p className="newuser">Are you new here? <a color="primary" onClick={()=>history.push("/register")} >Register</a></p>
                   </div>
                </Paper>
            </Container>    
           </div>
       <Footer/>
       </div>

    );
  }
  
  export default Signin;
  