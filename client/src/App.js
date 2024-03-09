import { Routes, Route } from 'react-router-dom'
import './App.css';

import Layout from './components/Layout/Layout';
import Login from './features/auth/Login';
import Home from './pages/Home/Home';
import Player from './pages/Player/Player';
import Navigation from './components/Navigation/Navigation';
import UsersList from './features/users/UsersList';
import ItemList from './features/items/ItemsList';
import HeroList from './features/heroes/HeroList';
import AbilityList from './features/abilities/AbilitiesList';
import Edit from './components/Edit/Edit';
import Create from './components/Create/Create';

import Prefetch from './features/auth/Prefetch';
import CreateHero from './features/heroes/CreateHero';
import { store } from './app/Store';
import Dashboard from './components/Dashboard/Dashboard';
import PersistLogin from './features/auth/PersistLogin';

import {ROLES} from './config/roles';
import RequireAuth from './features/auth/RequireAuth';

import { getTokenFromLocalStorage} from './features/api/storage';
import Admin from './pages/Admin/Admin';
import Profile from './pages/Profile/Profile';
import ProfilePage from './pages/Profile/ProfilePage';
import Register from './features/auth/Register';

function App() {



// When application initializes, check for token in localStorage
const initializeApp = () => {
  const token = getTokenFromLocalStorage();
  if (token) {
    // Use token for authentication
  } else {
    // User is not authenticated
  }
};

initializeApp();


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public facing open pages*/}
        <Route index element={<Home />}/>


        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register/>} />
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>

            {/*Below used to be player: <Player />*/}
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="heroes" element={<></>}/>
            </Route>

            <Route path="heroes" element={<HeroList adminMode={false}/>} />
            
            <Route path="items" element={<ItemList adminMode={false}/>} />

            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route path='profile'>
                  <Route index element={<ProfilePage />}></Route>
              </Route>
            </Route>

              
              {/* Login Required with priveleges */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path='admin'>
                <Route index element={<Admin/>}></Route>
                <Route path='items' element={<ItemList adminMode={true}/>} />
                <Route path='users' element={<UsersList/>} />
                <Route path='heroes' element={<HeroList adminMode={true}/>} />
                <Route path='abilities' element={<AbilityList adminMode={true}/>} />
                
                {/* Items */}
                <Route path='item/edit/:id'
                  element={<Edit recUrl="http://localhost:3500/items" 
                  editUrl="http://localhost:3500/items" 
                  deleteUrl="http://localhost:3500/items"
                  inputs={['name', 'cost', 'alterations', 'description', 'upgradePath', 'predecessorPath', 'imageLoc', 'active']}
                  
                />}/>

                <Route path='item/create' element={<Create
                  createUrl="http://localhost:3500/items"
                  inputs={['name', 'cost', 'alterations', 'description', 'upgradePath', 'predecessorPath', 'imageLoc', 'active']}
                  
                  inputsType={['String', 'Number', 'String', 'String', 'Array', 'Array', 'String', 'Boolean']}
                />}/>

                {/* Heroes */}
                <Route path='hero'>
                  <Route path='create' element={
                    <CreateHero />
                    /*
                  <Create
                    createUrl="http://localhost:3500/heroes"
                    inputs={['name', 'description', 'primaryAttribute', 'imageLoc', 'abilities', 'active']}
                    inputsType={['String', 'String', 'String', 'String', 'ArrayS', 'Boolean']}
                  />
                  */}/>

                  <Route path='edit/:id'
                    element={<Edit recUrl="http://localhost:3500/heroes" 
                    editUrl="http://localhost:3500/heroes" 
                    deleteUrl="http://localhost:3500/heroes"
                    inputs={['name', 'description', 'primaryAttribute', 'imageLoc', 'abilities', 'active']}
                    inputsType={['String', 'String', 'String', 'String', 'ArrayS', 'Boolean']}
                  />}/>
                </Route>


                {/* Abilities */}
                <Route path='ability/create' element={<Create
                  createUrl="http://localhost:3500/abilities"
                  inputs={['name', 'description', 'cooldown', 'manaCost', 'healthCost', 'castRange', 'radius', 'duration', 'imageLoc']}
                  inputsType={['String', 'String', 'ArrayN', 'ArrayN', 'ArrayN', 'ArrayN', 'ArrayN', 'ArrayN', 'String']}
                />}/>

                <Route path='ability/edit/:id'
                  element={<Edit recUrl="http://localhost:3500/abilities" 
                  editUrl="http://localhost:3500/abilities" 
                  deleteUrl="http://localhost:3500/abilities"
                  inputs={['name', 'description', 'cooldown', 'manaCost', 'healthCost', 'castRange', 'radius', 'duration', 'imageLoc']}
                  inputsType={['String', 'String', 'ArrayN', 'ArrayN', 'ArrayN', 'ArrayN', 'ArrayN', 'ArrayN', 'String']}
                  
                />}/>
                
              </Route> {/* end of admin */}
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>

  );
}

export default App;