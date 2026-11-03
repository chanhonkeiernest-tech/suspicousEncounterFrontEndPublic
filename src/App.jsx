import { Outlet } from 'react-router-dom'
import { LoginProvider } from './context/LoginContext'
import {MergeProvider} from './context/MergeContext'
import { SearchProvider } from './context/SearchContext'
import NavBar from "./components/NavBar";


import './App.css'


function App() {
  

  return (
    <LoginProvider>
    <MergeProvider>
    <SearchProvider>
      <NavBar/>
      <main>
        <Outlet />
      </main>
    </SearchProvider>
    </MergeProvider>
    </LoginProvider>

  )
}

export default App
