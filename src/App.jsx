import React, { useContext } from 'react'
import Home from './Admin/Home'
import UserHome from './User/pages/Home/UserHome'
import { StoreContext } from './Context/StoreContext'

const App = () => {
  const {isAdmin} = useContext(StoreContext)
  return (<>
    {isAdmin?(<Home/>):(<UserHome/>)}
    </>
  )
}

export default App