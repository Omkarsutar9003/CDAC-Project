import './App.css';
import Protected from './protected';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Plash from './pages/plash';
import Signin from './pages/signin';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Dashboard1 from './pages/dashboard_t';
import CreateGroup from './pages/creategroup';
import Group from './pages/group';
import Chat from './pages/chat'
import Addstud from './pages/addstudent';
import AddTeacher from './pages/addteacher';
import Teacher_login from './pages/teacher_login'
import Logout from './pages/logout';
import DashboardStud from './pages/dashboard_stud';
import Signinstud from './pages/stud_login';
import page from './pages/chat1';
import SetPassword from './pages/passwordreset';
import StudentProfile from './pages/student_profile';
import TeacherProfile from './pages/teacher_profile';
import Viewstudent from './pages/viewstudent';
import Viewteacher from './pages/viewteacher';
import InstituteProfile from './pages/instituteProfile';


function App() {
  return (
  <div>
    <Router>
      
        <Route path='/' exact component={Plash} />
        <Route path='/reset/password' exact component={SetPassword} />
        <Route path='/logout' exact component={Logout} />

        <Route path='/signin' exact component={Signin} />
        <Route path='/register' exact component={Register} />

        <Route path="/dashboard">
               <Protected Cmp={Dashboard}/>
        </Route>
        <Route path="/teacher/dashboard">
               <Protected Cmp={Dashboard1}/>
        </Route>
        <Route path="/student/dashboard">
               <Protected Cmp={DashboardStud}/>
        </Route>

        <Route path="/addstudent">
               <Protected Cmp={Addstud}/>
        </Route>
        <Route path="/viewstudent">
               <Protected Cmp={Viewstudent}/>
        </Route>
        <Route path="/addteacher">
               <Protected Cmp={AddTeacher}/>
        </Route>
        <Route path="/viewteacher">
               <Protected Cmp={Viewteacher}/>
        </Route>


        <Route path='/teacher/login' exact component={Teacher_login} />
        
        <Route path="/profile/teacher/:sid">
               <Protected Cmp={TeacherProfile}/>
        </Route>
        
        

        <Route path='/student/login' exact component={Signinstud} />

        
        <Route path="/profile/student/:sid">
               <Protected Cmp={StudentProfile}/>
        </Route>
        <Route path="/profile/institute">
               <Protected Cmp={InstituteProfile}/>
        </Route>
        <Route path='/create-group' exact component={CreateGroup} />
        <Route path="/group/:gid">
               <Protected Cmp={Group}/>
        </Route>
        <Route path="/chat">
               <Protected Cmp={Chat}/>
        </Route>
      
        
      
    </Router>
  </div>
  );
}

export default App;
