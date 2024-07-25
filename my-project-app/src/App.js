import logo from './logo.svg';
import './App.css';
import Background from './img/Background.svg';
import Navbar from './Components/Navbar';
import Basic_Information from './Components/Form/Basic_Information';
import Course_Analysis_Information from './Components/Form/Course_Analysis_Information';
import Management_Information from './Components/Form/Management_Information';
import Student_Admission from './Components/Form/Student_Admission';
import Teachers_Information from './Components/Form/Teachers_Information';

import Form_Add_Member from './Components/Add_Member/Form_Add_Member';

function App() {

  const BackgroundImage = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
      {/* <Navbar /> */}

      <Form_Add_Member />

      <Basic_Information />
      <Course_Analysis_Information />
      <Student_Admission />
      <Management_Information />
      <Teachers_Information />


    </div>
  );
}

export default App;
