import React,{useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router-dom";
import Footer from "./footer";
import Top2 from '../top1';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import swal from "sweetalert";
import { makePostRequest } from "../util/utils";


	const validationSchema = Yup.object({
		institute_name:Yup.string().required('Required'),
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
		institute_name:'',
		contact:'',
	}

function Register() {
    const history = useHistory();

    const[chkval,setchkval]=useState(false);
    const[institute_name,setinstitute_name]=useState('');
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');
    const[cpassword,setcpassword]=useState('');
    const[contact,setcontact]=useState('');
    const[selectedFile,setSelectedFile]=useState('');

    const checkboxadd = (e) => {
      if(e===false)
      {      
        setchkval(true);
      }
      else{
        setchkval(false);
      }
    console.log(chkval)
    };
    
    const changeHandler = (event) => {
      console.log('data',event.target.files[0])
      setSelectedFile(event.target.files[0]);
  };

	async function onSubmit(e){
    if(chkval===true){
      let bodyFormData = new FormData();
                bodyFormData.append("institute_name",institute_name);
                bodyFormData.append("institute_email",email);
                bodyFormData.append("institute_password",password);
                bodyFormData.append("institute_contact",contact);
                bodyFormData.append("Profile",selectedFile);
                makePostRequest("/add/institute", bodyFormData).then((response) => {
                    if (response.data.status === "1") {
                        swal("Success","Institute Registration Successfully", "success").then(()=>{
                          history.push("/signin")
                        })
                      }else{  
                        swal("Error",response.data.message, "warning"); 
                      }
                    
                  }).catch((err) => {
                    swal("There was an error!", "more error details", "warning");
                  });
    }else{
      alert("please accept teams & condition")
    }   
    
    
	}

    return (
       <div className="plashBox">
           <Top2 title="sign in"/>
           <div className="mainBoxInner">
           <Container maxWidth="md">
                 <Paper spacing={3} className="plashPaper" >
                    <div className="plashInner">
                    <h1 className="registration">Registration</h1>
                   
					<Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema} 
            onSubmit={onSubmit}
          >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
						<Form>
           
                    <TextField  label="Enter Institute Name" className="myInput"
                     value={values.institute_name}
                     onChange={handleChange("institute_name")}
                     onBlur={() => setFieldTouched("institute_name")}
                     onChangeCapture={(e) => (setinstitute_name(e.target.value))}
                    />
                    {errors.institute_name && touched.institute_name ? <div className="errmsg">{errors.institute_name}</div> : null}

                    <TextField  label="Enter email address" className="myInput"
                    value={values.email}
                    onChange={handleChange("email")}
                    onBlur={() => setFieldTouched("email")}
                    onChangeCapture={(e) => (setemail(e.target.value))}
                   />
                   {errors.email && touched.email ? <div className="errmsg">{errors.email}</div> : null}

                    <TextField type="password"  label="Create password" className="myInput"
                    value={values.password}
                    onChange={handleChange("password")}
                    onBlur={() => setFieldTouched("password")}
                    onChangeCapture={(e) => (setpassword(e.target.value))}
                   />
                   {errors.password && touched.password ? <div className="errmsg">{errors.password}</div> : null}

                    <TextField type="password"  label="Confirm password" className="myInput"
                    value={values.cpassword}
                    onChange={handleChange("cpassword")}
                    onBlur={() => setFieldTouched("cpassword")}
                    onChangeCapture={(e) => (setcpassword(e.target.value))}
                   />
                   {errors.cpassword && touched.cpassword ? <div className="errmsg">{errors.cpassword}</div> : null}

                    <TextField label="Enter mobile number" className="myInput"
                    value={values.contact}
                    onChange={handleChange("contact")}
                    onBlur={() => setFieldTouched("contact")}
                    onChangeCapture={(e) => (setcontact(e.target.value))}
                   />
                   {errors.contact && touched.contact ? <div className="errmsg">{errors.contact}</div> : null}
                   <br/><br/>
                   <div className='alg-grp-text boxRow'>
                        <p>Profile </p>
                        <input type="file" name="file"  onChange={changeHandler} /> 
                  </div>
                    <div className="checkBox">
                         <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} value={chkval} onClick={(e)=>checkboxadd(chkval)}/>
                         I agree to the 
                         <a onClick={()=>history.push("/termsconditions")}> Terms & Conditions</a> & 
                         <a onClick={()=>history.push("/privacypolicy")}> Privacy Policy</a>     
                    </div>  
                    <Button variant="contained" color="primary" disabled={!isValid} onClick={(e) => handleSubmit(e)} className="buttBottomSpace">
                        Register
                    </Button>
                </Form>
              )}
					</Formik>
                    <p className="newuser">Already have account? <a onClick={()=>history.push("/signin")} >Sign In</a></p>
                   </div>
                </Paper>
            </Container>    
           </div>
       <Footer/>
       </div>

    );
  }
  
  export default Register;
  