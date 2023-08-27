import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';  
import { useHistory } from "react-router-dom";

function Footer() {
    const history = useHistory();
    return (
       <div className="footerMain">
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <a  onClick={()=>history.push("/termsconditions")} >Terms & Conditions</a> &nbsp; / &nbsp;&nbsp; 
                        <a   onClick={()=>history.push("/privacypolicy")} >Privacy Policy</a> &nbsp; / &nbsp;&nbsp; 
                        <a   onClick={()=>history.push("/contactus")} >Contact us</a>
                    </Grid>
                    <Grid item xs={6} className="centerRight">
                        © All Rights Reserved
                    </Grid>
                </Grid>
            </Container>
       </div>
    );
  }
  
  export default Footer;  