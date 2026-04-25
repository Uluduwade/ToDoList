import ToDoList from './assets/ToDoList.js'
import Beams from './components/Beams.jsx';
import './App.css';
import ClickSpark from './components/ClickSpark.jsx';

function App() {
  return (
    
    <div className="app-shell">
      
      <div className="beams-layer" aria-hidden="true">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
       
      </div>
      <main className="content-layer">
        <ClickSpark sparkColor="#86ff49" sparkSize={5} sparkRadius={50} sparkCount={20} duration={1000} easeFunc="easeOutCubic" extraScale={1.5}>
           
        
        <ToDoList />
        </ClickSpark>
      </main>
    
    </div>
  );
}

export default App
