import logo from './logo.svg';
import './App.css';
import Background from './img/Background.svg';


import Navbar from './Components/Navbar/Navbar';
import AddUser_Form from './Components/User/AddUser_Form';

import Basic_Information from './Components/RequestForm/Basic_Information';
import Course_Analysis_Information from './Components/RequestForm/Course_Analysis_Information';
import Management_Information from './Components/RequestForm/Management_Information';
import Student_Admission from './Components/RequestForm/Student_Admission';
import Teachers_Information from './Components/RequestForm/Teachers_Information';



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

        <AddUser_Form />

        <Basic_Information />
        <Course_Analysis_Information />
        <Student_Admission />
        <Management_Information />
        <Teachers_Information />
      </div>


    </div>
  );
}

export default App;
