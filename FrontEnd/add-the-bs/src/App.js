import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='container max-w-full max-h-48 flex justify-center bg-gray-500'>
          <img src={logo} className="App-logo max-h-52" alt="logo" />
        </div>
        <div>
          <p>Testing</p>
        </div>
      </header>
    </div>
  );
}

export default App;
