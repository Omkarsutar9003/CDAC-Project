
import Paper from '@material-ui/core/Paper';
import { Button ,TextField,Grid } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import Top3 from './top3';
import * as Yup from 'yup';
import {Formik,Form} from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import React,{useState} from 'react';
import swal from "sweetalert";
import { makePostRequest } from "../util/utils";


const Validation_Schema = Yup.object().shape({
    gname: Yup.string().required('Required'),

    decp: Yup.string().required('Required')

})

const course = [{course:'Science'},
{course:'Art'},
{course:'Commers'}];

const year = [{year:'First Year',y1:'FY'},
{year:'Second Year',y1:'SY'},
{year:'Third Year',y1:'TY'}];

function CreateGroup() {
    const history = useHistory();

    // const[open9, setOpen9] = useState(false);
    const[gname,setgname]=useState('');
    const[decp,setdecp]=useState('');
    const[selectedFile,setSelectedFile]=useState('');
    const [selectcourse, setselectcourse] = useState('');
    const [selectyear, setselectyear] = useState('');
   
   
    const handlechangecourse = (e) => {
        setselectcourse(e.target.value)
      }
    const handlechangeyear = (e) => {
        setselectyear(e.target.value)
      }
    const changeHandler = (event) => {
        console.log('data',event.target.files[0])
        setSelectedFile(event.target.files[0]);
    };
   const setdecption = (e)=>{
    setdecp(e.target.value)
   }

   
   async function onSubmit() {
    alert(decp)
    if(selectedFile.name==null){
        swal("Warning","Profile is requird", "warning");
    }
    else{
    let bodyFormData = new FormData();
        bodyFormData.append("gname",gname);
        bodyFormData.append("gdecp",decp);
        bodyFormData.append("course",selectcourse);
        bodyFormData.append("year",selectyear);
        bodyFormData.append("Profile",selectedFile);
        bodyFormData.append("iid",localStorage.getItem("institute_id"));
        bodyFormData.append("admin_id",localStorage.getItem("teacher_id"));
        makePostRequest("/add/group", bodyFormData).then((response) => {
          if(response.data.status=="1") 
          {
            swal("Success","Group Created", "success");
            history.push("/teacher/dashboard");
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
let decp1=selectyear+" "+selectcourse+" "+gname;
    var UserInitials = {
        gname:gname,
        decp:decp1,
    }  
      
    return (
       <div className="plashBox">
           <Top3/>
           <div className="mainBoxInner">
           <Container maxWidth="md">
                 <Paper spacing={3} className="plashPaper noSpaceBott " >
                    <div className="plashInner">
                    <h1>Create Group</h1>
                    <Formik
                    enableReinitialize
                    initialValues={UserInitials}
                    validationSchema={Validation_Schema}
                    onSubmit={onSubmit}
                    >
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
                        <Form>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
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
                        <Grid item xs={6}>
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
                        <Grid item xs={12}> 
                    <TextField  label="Enter group name" className="myInput" 
                     value={values.gname}
                     onChange={handleChange("gname")}
                     onBlur={() => setFieldTouched("gname")}
                     onChangeCapture={(e) => (setgname(e.target.value))}
                     />
                      {errors.gname && touched.gname ? <div className="errmsg">{errors.gname}</div> : null}
                      </Grid>
                      <Grid item xs={12}>
                    <TextField
                        label="Enter Description "
                        multiline
                        rows={7}
                        variant="outlined"
                        className="myInput textArea" 
                        value={values.decp}
                        onChange={setdecption}
                        onBlur={() => setFieldTouched("decp")}
                       // onChangeCapture={setdecption}
                    /> {errors.decp && touched.decp ? <div className="errmsg">{errors.decp}</div> : null}
                   </Grid>
                   <Grid item xs={12}>
                    <div className='alg-grp-text boxRow'>
                        <p>Profile </p>
                        <input type="file" name="file"  onChange={changeHandler} /> 
                    </div>
                    </Grid>
                     </Grid>
                    
                
                    {/* <p className="acronym" onClick={(e)=>handleClickOpen9(e.target.value)} >What's this?</p>                 */}
                    <Button  variant="contained" color="primary" disabled={!isValid} onClick={(e) => handleSubmit(e)}>
                    Create Group
                    </Button>
                    </Form>
                        )}
                    </Formik>

                   </div>
                </Paper>
            </Container>    
           </div>
    
    
       </div>

    );
  }
  
  export default CreateGroup;
  
