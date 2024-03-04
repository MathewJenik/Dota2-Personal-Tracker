import react, { useEffect } from 'react'
import { UsersApiSlice } from "../users/UsersApiSlice";
import { abilitiesApiSlice } from "../abilities/AbilitiesApiSlice";
import { heroesApiSlice } from "../heroes/HeroesApiSlice";
import { ItemsApiSlice } from "../items/ItemsApiSlice";
import { store } from "../../app/Store";
import { Outlet } from 'react-router-dom';


const Prefetch = () => {

    // prevents expiration
    useEffect(() => {
        // subscribing

        // creates a manual subscription through the api slice specified
        const users = store.dispatch(UsersApiSlice.endpoints.getUsers.initiate())
        const abilities = store.dispatch(abilitiesApiSlice.endpoints.getAbilities.initiate())
        const heroes = store.dispatch(heroesApiSlice.endpoints.getHeroes.initiate())
        const items = store.dispatch(ItemsApiSlice.endpoints.getItems.initiate())

        return () => {
            // unsubscribing
            users.unsubscribe();
            abilities.unsubscribe();
            heroes.unsubscribe();
            items.unsubscribe();
        }
    }, [])
    
  return <Outlet />
}

export default Prefetch