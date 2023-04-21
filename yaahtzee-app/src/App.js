import "./App.css";
import HomeView from "./components/HomeView";

function App() {
  return (
    <div className="Yahtzee-App">
      <header className="Yahtzee-game">
        <h1 className="h"> Welcome to Yahtzee</h1>
      </header>
      <div className="App-body">
        <HomeView />
      </div>
    </div>
  );
}

export default App;
