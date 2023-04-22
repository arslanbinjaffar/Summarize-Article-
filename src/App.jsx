import './App.css'
import {Hero,Demo} from './components';
function App() {

  return (
   <main>
    <div className='main'>
      <div className='gradient'/>
    </div>
    <div className='app'>

    <Hero/>
    <Demo/>
    </div>
   </main>
  )
}

export default App
