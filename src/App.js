import './App.css';
import picture from './doIt.png';
import ToDoList from './ToDoList';
import Slide from './slide';
import Animation from './animation';


function App() {
  return (
    <div className="note">
      <div className="one">
        <img className="images" src={picture} alt="Let's Do It"/>
        <Animation />
        <div>
        <Slide />
      </div>
      </div>
      <div className="two">
      <div className="container">
        <h1>What are your plans for today</h1>
      </div>
      <ToDoList />
      </div>
    </div>
  );
}

export default App;