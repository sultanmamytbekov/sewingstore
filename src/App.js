import "./App.scss";
import Header from "./components/Header";
import ReactRouter from "./routes/ReactRouter";

function App() {
  return (
    <div className="App">
      <Header />
      <ReactRouter />
    </div>
  );
}

export default App;
