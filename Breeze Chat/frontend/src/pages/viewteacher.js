
import React, {useEffect,useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { Button, Tooltip,Select, Checkbox,Grid, Box,Chip } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useHistory,useParams } from "react-router-dom";
import Top3 from './top3';
import Divider from '@material-ui/core/Divider';
import DataTable from 'react-data-table-component';
import MemberIcon from "../assets/images/memberIcon.svg";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import { makePostRequest ,makeGetRequest} from "../util/utils";



export default function Viewteacher() {
   const history = useHistory();
   
  
    const[Iname,setIname]=useState('');
    const[institute,setinstitute]=useState([]);

    const[tea_data,settea_data]=useState([]);
    const[tcount,settcount]=useState(0);
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
  

  async function viewteacher(){
    let bodyFormData = new FormData();
    makeGetRequest(`/view/teacher?id=${localStorage.getItem("institute_id")}&page=${page}&perpage=${perpage}&delay=1`, bodyFormData).then((response) => {
        if(response.data.status === "1") {
            settea_data(response.data)
            settcount(response.data.tcount)
        }else{
            settea_data([])
        }    
    }).catch((err) => {
      swal("There was an error!", "more error details", "warning");
    });
  }

  //search teacher
  async function saerchteacher(){
    let bodyFormData = new FormData();
    makeGetRequest(`/search/teacher?find=${q}&id=${localStorage.getItem("institute_id")}`, bodyFormData).then((response) => {
        if(response.data.status === "1") {
            settea_data(response.data)
        }else{
            settea_data([])
        }    
    }).catch((err) => {
      swal("There was an error!", "more error details", "warning");
    });
  }



  async function DeleteUser() {
    let bodyFormData=new FormData();
    makePostRequest(`/delete/teacher/${cid}`,bodyFormData).then((response)=> {
        if(response.data.status === "1") {
            swal("Success","Student Deleted", "success");
            handleClose()
            viewteacher();
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
        saerchteacher()
     }else{
        viewteacher();
     }
     
   
     viewinstitute();
    
    },[l,page,perpage])
    const columns = [
        {
            name:'Teacher Id',
            selector:"teacher_id",
            sortable:true
        },
        {
            name: 'Image',
            selector: 'img',
            cell: row => {
                return (
                  <div className="tblImgOut"> 
                    <img src={process.env.PUBLIC_URL + `/uploads/${row.t_img}`} alt="img" className="readndrollimg"/> 
                  </div>
                )
            }
        },
        
        {
            name: 'First Name',
            selector:"teacher_fname",
        },
    
        {
            name: 'Last name',
            selector:"teacher_lname",
        },
    
        {
            name: 'Email',
            selector:"teacher_email",
        },
        {
            name: 'Contact',
            selector:"teacher_contact",
        },
        {
            name: 'Action',
            selector:"",
            cell: row => {
                return (
                  <div> 
                     <DeleteIcon onClick={()=>handleClickOpen(row.teacher_id)}/>
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
                            <h2>{tcount}</h2>
                            <p>Teachers</p>
                        </div>
                       
                      
                    </Grid>
                  
                </Grid>
                </div> 
                </Paper>
               
<Grid container spacing={3} className="listingItem topSpace">
<Grid item xs={12} >
<Paper className="sectionnBox" >
<div>
       <DataTable className='tbldata'
        title="Manage Teacher "
            columns={columns}
            data={tea_data.data}
            pagination
            paginationServer
            currentPage={page}
            paginationDefaultPage={1}
            paginationResetDefaultPage={1}
            paginationPerPage={perpage}
            paginationTotalRows={tea_data.total}
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
  
  