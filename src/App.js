import React from 'react';
import GroceryList from './containers/groceryList';
import { AuthContext } from './context/authContext';
import { useContext } from 'react';
import Auth from './containers/auth';

function App() {
  const authContext = useContext(AuthContext);
  return (
    <div className="container">
      {authContext.isAuth ? <GroceryList /> : <Auth />}
    </div>
  );
}

export default App;
