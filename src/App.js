import './App.scss';
import Foouter from './components/Foouter';
import Header from './components/Header';
import ReactRouter from './routes/ReactRouter';

function App() {
  return (
    <div className="App">
      <Header/>
      <ReactRouter/>
      <Foouter/>
    </div>
  );
}

export default App;
