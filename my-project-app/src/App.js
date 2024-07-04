import logo from './logo.svg';
import './App.css';
import Background from './img/Background.svg'

function App() {

  const BackgroundImage = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
      
    </div>
  );
}

export default App;
