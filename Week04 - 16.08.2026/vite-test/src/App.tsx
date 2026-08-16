
import './App.css'
import PopoverDemo from './PopoverDemo'
import UserCard from './UserCard'

function App() {


  return (

    <div className='flex h-screen w-screen justify-center items-center'>

      
      <UserCard name={"Barak"} age={18} />
      <PopoverDemo />

    </div>


  )
}

export default App
