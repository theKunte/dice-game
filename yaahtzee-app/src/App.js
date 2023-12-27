import "./App.css";
import HomeView from "./components/HomeView/HomeView";

function App() {
  return (
    <div className="yathzee-app">
      <h1> Welcome to Yahtzee</h1>

      <div className="App-body">
        <HomeView />
      </div>
    </div>
  );
}

export default App;
