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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="login" element={<Login />}/>
        <Route path="dashboard" element={<Player />}>
          <Route path="heroes" element={<></>}/>
        </Route>

        <Route path="heroes" element={<HeroList adminMode={false}/>} />
        
        <Route path="items" element={<ItemList adminMode={false}/>} />

        
        <Route path='admin'>
          <Route path='users' element={<UsersList/>} />
          <Route path='items' element={<ItemList adminMode={true}/>} />
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
          <Route path='hero/create' element={<Create
            createUrl="http://localhost:3500/heroes"
            inputs={['name', 'description', 'primaryAttribute', 'imageLoc', 'abilities', 'active']}
            inputsType={['String', 'String', 'String', 'String', 'ArrayS', 'Boolean']}
          />}/>

          <Route path='hero/edit/:id'
            element={<Edit recUrl="http://localhost:3500/heroes" 
            editUrl="http://localhost:3500/heroes" 
            deleteUrl="http://localhost:3500/heroes"
            inputs={['name', 'description', 'primaryAttribute', 'imageLoc', 'abilities', 'active']}
            inputsType={['String', 'String', 'String', 'String', 'ArrayS', 'Boolean']}
          />}/>


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

        </Route>

      </Route>
    </Routes>

  );
}

export default App;