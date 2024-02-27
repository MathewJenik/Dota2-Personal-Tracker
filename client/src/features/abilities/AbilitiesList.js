import React from 'react'
import { useGetAbilitiesQuery } from './AbilitiesApiSlice';
import Ability from './Ability'

function AbilityList() {

    const {
        data: ability,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAbilitiesQuery()


    let content;

    if (isLoading) content = <p>Loading...</p>
    if (isError) content = <p className='error-msg'>{error?.data?.message}</p>

    if (isSuccess) {
        const {ids} = ability
        const tableContent = ids?.length
        ? ids.map(abilityId => <Ability key={abilityId} abilityId={abilityId} />)
        : null

        content = (
            <ul>
                {tableContent}
            </ul>

        )

    }

    return content;

}

export default AbilityList