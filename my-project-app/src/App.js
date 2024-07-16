import logo from './logo.svg';
import './App.css';
import Background from './img/Background.svg';
import Navbar from './Components/Navbar';
import Basic_Information from './Components/Form/Basic_Information';
import Course_Analysis_Information from './Components/Form/Course_Analysis_Information';
import Management_Information from './Components/Form/Management_Information';

function App() {

  const BackgroundImage = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
      <Navbar />

      <Basic_Information />
      <Course_Analysis_Information />
      <Management_Information />

    </div>
  );
}

export default App;
