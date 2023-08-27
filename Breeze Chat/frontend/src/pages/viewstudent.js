
import React, {useEffect,useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { Button,Grid } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useHistory,useParams } from "react-router-dom";
import Top3 from './top3';
import Divider from '@material-ui/core/Divider';
import DataTable from 'react-data-table-component';
import MemberIcon from "../assets/images/memberIcon.svg";
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';
import { makePostRequest ,makeGetRequest} from "../util/utils";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Viewstudent() {
   const history = useHistory();
   
  
    const[Iname,setIname]=useState('');
    const[institute,setinstitute]=useState([]);
    const[stud_data,setstud_data]=useState([]);
    const[studcount,studsetcount]=useState(0);
    const [q, setq] = useState('');

    const[page,setpage]=useState(1);
    const[perpage,setperpage]=useState(5);   
    const[cid,setcid]=useState();
    const [open, setOpen] =useState(false);

    const handleClickOpen = (id) => {
        setcid(id);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      };
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

  //search student
  async function saerchstudent(){
    let bodyFormData = new FormData();
    makeGetRequest(`/search/student?find=${q}&id=${localStorage.getItem("institute_id")}`, bodyFormData).then((response) => {
        if(response.data.status === "1") {
            setstud_data(response.data)
        }else{
            setstud_data([])
        }    
    }).catch((err) => {
      swal("There was an error!", "more error details", "warning");
    });
  }



  async function DeleteUser() {
    let bodyFormData=new FormData();
    makePostRequest(`/delete/student/${cid}`,bodyFormData).then((response)=> {
        if(response.data.status === "1") {
            swal("Success","Student Deleted", "success");
            handleClose()
            viewstudent();
        }
        else {
            swal("Error","more error details", "Error");
        }
    })
    .catch((err) => {
         swal("There was an error!","more error details", "warning");
    });
}



    let l=q.length
    useEffect(()=>{
     if(l>0){
        saerchstudent()
     }else{
        viewstudent();
     }
     viewinstitute();
    },[l,page,perpage])

    const columns = [
        {
            name:'Student Id',
            selector:"student_id",
            sortable:true
        },
        {
            name: 'Image',
            selector: 'img',
            cell: row => {
                return (
                  <div className="tblImgOut"> 
                    <img src={process.env.PUBLIC_URL + `/uploads/${row.s_img}`} alt="img" className="readndrollimg"/> 
                  </div>
                )
            }
        },
        
        {
            name: 'First Name',
            selector:"student_fname",
        },
    
        {
            name: 'Last name',
            selector:"student_lname",
        },
    
        {
            name: 'Email',
            selector:"student_email",
        },
        {
            name: 'Contact',
            selector:"student_contact",
        },
    
        {
            name: 'Course',
            selector:"course",
        },
    
        {
            name: 'Academics Year',
            selector:"cyear",
        },
        {
            name: 'Action',
            selector:"",
            cell: row => {
                return (
                  <div> 
                     <DeleteIcon onClick={()=>handleClickOpen(row.student_id)}/>
                  </div>
                )
            }
        },
    ];
    

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
                        <Divider orientation="vertical" flexItem />
                        <div className="countsOut">
                            <h2>{studcount}</h2>
                            <p>Members</p>
                        </div>
                       
                        {/* <span>
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
                            <h2>{studcount}</h2>
                            <p>Groups</p>
                        </div>    */}
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
<Grid item xs={12} >
<Paper className="sectionnBox" >
<div>
       <DataTable className='tbldata'
        title="Manage Students "
            columns={columns}
            data={stud_data.data}
            pagination
            paginationServer
            currentPage={page}
            paginationDefaultPage={1}
            paginationResetDefaultPage={1}
            paginationPerPage={perpage}
            paginationTotalRows={stud_data.total}
            onChangePage={page=>setpage(page)}
            paginationComponentOptions={{ noRowsPerPage:true }}
           
        />
</div>
</Paper>
</Grid>
</Grid>
</Container>    
</div>

<Dialog
        open={open}
        maxWidth='md'
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you Sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to delete ? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={DeleteUser}  >
              YES
        </Button>
        </DialogActions>
      </Dialog>
</div>

    );
  }
  
  