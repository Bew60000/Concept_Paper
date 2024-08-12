import logo from './logo.svg';
import './App.css';
import Background from './img/Background.svg';

import Navbar from './Components/Navbar/Navbar';
import AddUser_Form from './Components/Role_Admin/AddUser_Form';

import Basic_Information from './Components/RequestForm/Basic_Information';
import Course_Analysis_Information from './Components/RequestForm/Course_Analysis_Information';
import Management_Information from './Components/RequestForm/Management_Information';
import Student_Admission from './Components/RequestForm/Student_Admission';
import Teachers_Information from './Components/RequestForm/Teachers_Information';

import Homepage_Admin from './Components/HomeAdmin/Homepage_Admin';
import Homepage_User from './Components/HomeUser/Homepage_User';
import Homepage_Director from './Components/HomeDirector/Homepage_Director';
import UpdateUser from './Components/Role_Admin/Update_user';


function App() {

  const BackgroundImage = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
      <div className='pt-20'>
        <Navbar />

        <Homepage_Admin />
        <Homepage_Director />
        <Homepage_User />
        <Basic_Information />
        {/* <AddUser_Form />

       
        <Course_Analysis_Information />
        <Student_Admission />
        <Management_Information />
        <Teachers_Information /> */}
      </div>


    </div>
  );
}

export default App;
