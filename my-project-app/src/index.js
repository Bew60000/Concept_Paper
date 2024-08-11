import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';

import Login from './Components/Login/Login';

import Homepage_Admin from './Components/Role_Admin/Homepage_Admin';
import Homepage_User from './Components/Role_User/Homepage_User';
import Homepage_Director from './Components/Role_Director/Homepage_Director';

import Basic_Information from './Components/RequestForm/Basic_Information';
import Course_Analysis_Information from './Components/RequestForm/Course_Analysis_Information';
import Management_Information from './Components/RequestForm/Management_Information';
import Student_Admission from './Components/RequestForm/Student_Admission';
import Teachers_Information from './Components/RequestForm/Teachers_Information';

import AddUser_Form from './Components/Role_Admin/AddUser_Form';

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
        <Route path="homeuser" element={<Homepage_User />} />
        <Route path="homedirector" element={<Homepage_Director />} />
        <Route path="homeadmin" element={<Homepage_Admin />} />

        <Route path="/adduser" element={<AddUser_Form />} />

        <Route path="/basic_information" element={<Basic_Information />} />
        <Route path="/course_analysis_information" element={<Course_Analysis_Information />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
