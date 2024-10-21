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
import State02_ShowDetailAssign_work from './Components/Role_Admin/State_Status/State02 Assign work.js/State02_ShowDetailAssign_work'; // State02_ShowDetailAssign_work
import State03_ShowDetailMake_assessment from './Components/Role_Admin/State_Status/State03 Make assessment/State03_ShowDetailMake_assessment'; // State03 Make_assessment
import State04_ShowDetailConclusion from './Components/Role_Admin/State_Status/State04 Conclusion/State04_ShowDetailConclusion'; //State04_ShowDetailConclusion
import State05_ShowDetailAssessmentCompleted from './Components/Role_Admin/State_Status/State05 Assessment completed/State05_ShowDetailAssessmentCompleted'; //State05_ShowDetailAssessmentCompleted
import State06_ShowDetailCanceled_request from './Components/Role_Admin/State_Status/State06 Canceled request/State06_ShowDetailCanceled_request'; // State06_ShowDetailCanceled_request
import State07_ShowDeTailRejected_request from './Components/Role_Admin/State_Status/State07 Rejected request/State07_ShowDeTailRejected_request'; // State07 Rejected_request

// Director
// import State01_Assignedwork from './Components/Role_Director/State01 AssignedWork/State01_Assignedwork'; //State01_Assignedwork
import State02_ShowDataCompletedAssignedWork from './Components/Role_Director/State02 CompletedAssignedWork/State02_ShowDataCompletedAssignedWork'; //State02_ShowDataCompletedAssignedWork

//User
import State02_ShowDetailCanceledForm from './Components/Role_User/State02 Canceled requset/State02_ShowDetailCanceledForm';//State02 ShowDetailCanceledForm
import State03_ShowDetailRejectRequest from './Components/Role_User/State03 Rejected requset/State03_ShowDetailRejectRequest'; //State03_ShowDetailRejectRequest
import State04_ShowDetailFinishedForm from './Components/Role_User/State04 Finished requset/State04_ShowDetailFinishedForm'; //State04_ShowDetailFinishedForm

import AllForm from './App';
import UpdateForm from './Components/Role_User/EditForm/UpdateForm';
import Update_cosanalysis from './Components/Role_User/EditForm/Edit_CourseAnalysis';

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


        <Route path='/user/showdetailcanceledform' element={<State02_ShowDetailCanceledForm />} />
        <Route path='/user/showdetailrejectrequest' element={<State03_ShowDetailRejectRequest />} />
        <Route path='/user/showdetailfinishedform' element={<State04_ShowDetailFinishedForm />} />

        <Route path='/admin/2/showdetailassign_work' element={<State02_ShowDetailAssign_work />} />
        <Route path='/admin/3/showdetailmake_assessment' element={<State03_ShowDetailMake_assessment />} />
        <Route path='/admin/4/showdetailconclusion' element={<State04_ShowDetailConclusion />} />
        <Route path='/admin/5/showdetail_assessment_completed' element={<State05_ShowDetailAssessmentCompleted />} />
        <Route path='/admin/6/showdetailcanceled_request' element={<State06_ShowDetailCanceled_request />} />
        <Route path='/admin/7/showdetailrejected_request' element={<State07_ShowDeTailRejected_request />} />

        <Route path='/director/2/showdatacompletedassignedwork' element={<State02_ShowDataCompletedAssignedWork />} />




        <Route path="/edit_form" element={<UpdateForm />} />
        <Route path="/edit_course_analysis_information" element={<Update_cosanalysis />} />


        <Route path="/All" element={<AllForm />} />





        <Route path="/Update_User" element={<UpdateUser />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
