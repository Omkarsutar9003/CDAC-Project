import myLogo from '../assets/images/mylogob.png';

import { Button,Container,Paper } from "@material-ui/core";

import { useHistory } from 'react-router-dom';
import Footer from "./footer";


function Plash() {
    const history = useHistory();
    return (
       <div className="plashBox">
           <div className="mainBox">
           <Container maxWidth="md">
                 <Paper spacing={3} className="plashPaper" >
                    <div className="plashInner">
                    <img src={myLogo} alt="logo" className="mainLogo" />
                    <h1>Welcome</h1>
                    <Button className="buttBottomSpace btn-hover" variant="contained" color="primary" onClick={()=>history.push("/teacher/login")} >
                        Teacher
                    </Button>
                    <Button className="buttBottomSpace btn-hover" variant="contained" color="primary" onClick={()=>history.push("/student/login")} >
                        Student
                    </Button>
                    <Button className="buttBottomSpace btn-hover" variant="contained" color="primary" onClick={()=>history.push("/signin")} >
                     Institute
                    </Button>
                      </div>
                </Paper>
            </Container>    
           </div>
       <Footer/> 
       </div>

    );
  }
  
  export default Plash;
  