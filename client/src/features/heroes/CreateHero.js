import React, { useEffect, useState } from 'react'

import { useAddNewHeroMutation } from './HeroesApiSlice'
import { useNavigate } from 'react-router-dom';
import { ATTRIBUTES } from '../../config/attributes';
import { selectAllAbilities } from '../abilities/AbilitiesApiSlice';
import { useSelector } from 'react-redux';
import CreateHeroForm from './CreateHeroForm';


const CreateHero = () => {

    const content = <CreateHeroForm/>

  return content;
}

export default CreateHero