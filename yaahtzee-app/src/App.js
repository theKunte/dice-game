import "./App.css";
import HomeView from "./components/HomeView";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="h"> Welcome to Yahtzee</h1>
      </header>
      <div className="App-body">
        <HomeView />
      </div>
    </div>
  );
}

export default App;
