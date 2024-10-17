import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';

//Login
import Login from './Components/Login/Login';

//Homepage : Role
import Homepage_Admin from './Components/Role_Admin/Homepage_Admin';
import Homepage_User from './Components/Role_User/Homepage_User';
import Homepage_Director from './Components/Role_Director/Homepage_Director';

//RequestForm
import Basic_Information from './Components/RequestForm/Basic_Information';
import Course_Analysis_Information from './Components/RequestForm/Course_Analysis_Information';
import Management_Information from './Components/RequestForm/Management_Information';
import Student_Admission from './Components/RequestForm/Student_Admission';
import Teachers_Information from './Components/RequestForm/Teachers_Information';
import Course_Instructor from './Components/RequestForm/Course_Instructor';

//Role_Admin : Usermanagement
import AddUser_Form from './Components/Role_Admin/UserManagement/AddUser_Form';
import ShowUserData from './Components/Role_Admin/UserManagement/ShowUserData';
import UpdateUser from './Components/Role_Admin/UserManagement/Update_user';

//Admin
// State02 Assign_work
import State02_ShowDetailAssign_work from './Components/Role_Admin/State_Status/State02_Assign_work.js/State02_ShowDetailAssign_work';
import Assign_woke from './Components/Role_Admin/State_Status/State02_Assign_work.js/Assign_woke';
// State03 Make_assessment
import State03_ShowDetailMake_assessment from './Components/Role_Admin/State_Status/State03 Make assessment/State03_ShowDetailMake_assessment';
// State06_ShowDetailCanceled_request
import State06_ShowDetailCanceled_request from './Components/Role_Admin/State_Status/State06 Canceled request/State06_ShowDetailCanceled_request';
// State07 Rejected_request
import State07_ShowDeTailRejected_request from './Components/Role_Admin/State_Status/State07 Rejected request/State07_ShowDeTailRejected_request'

// Director
// State01
import State01_Assignedwork from './Components/Role_Director/State01_AssignedWork/State01_Assignedwork';

//User
//State02 ShowDetailCanceledForm
import State02_ShowDetailCanceledForm from './Components/Role_User/State02 Canceled requset/State02_ShowDetailCanceledForm';

//Test All App
import AllForm from './App';

//Role_User
import UpdateForm from './Components/Role_User/UpdateForm';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* <Route path="/" element={<AllForm />} /> */}
       
        <Route path="homepage_user" element={<Homepage_User />} />
        <Route path="homepage_director" element={<Homepage_Director />} />
        <Route path="homepage_admin" element={<Homepage_Admin />} />

        <Route path="/show_user_data" element={<ShowUserData />} />
        
        <Route path="/add_user" element={<AddUser_Form />} />

        <Route path="/basic_information" element={<Basic_Information />} />
        <Route path="/course_analysis_information" element={<Course_Analysis_Information />} />
        <Route path="/student_admission" element={<Student_Admission />} />
        <Route path="/management_information" element={<Management_Information />} />
        <Route path="/teachers_information" element={<Teachers_Information />} />
        <Route path='/course_instructor' element={<Course_Instructor />} />

        
        <Route path='/showdetailcanceledform' element={<State02_ShowDetailCanceledForm />} />
        {/* <Route path='/showdetailmake_assessment' element={<State03_ShowDetailMake_assessment />} /> */}
        
        <Route path='/showdetailassign_work' element={<State02_ShowDetailAssign_work />} />
        <Route path='/assign_woke' element={<Assign_woke />} />
        
        <Route path='/showdetailmake_assessment' element={<State03_ShowDetailMake_assessment />} />
        {/* <Route path='/showdetailmake_assessment' element={<State03_ShowDetailMake_assessment />} /> */}
        <Route path='/showdetailcanceled_request' element={<State06_ShowDetailCanceled_request />} />        
        <Route path='/showdetailrejected_request' element={<State07_ShowDeTailRejected_request />} />

        <Route path='/state01_assignedwork' element={<State01_Assignedwork />} />
        
        <Route path="/edit_form" element={<UpdateForm />} />

        <Route path="/All" element={<AllForm />} />

        



        <Route path="/Update_User" element={<UpdateUser />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
