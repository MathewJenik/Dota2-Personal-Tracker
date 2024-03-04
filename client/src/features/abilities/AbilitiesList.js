import React from 'react'
import { useGetAbilitiesQuery } from './AbilitiesApiSlice';
import Ability from './Ability'
import CreateNewComponent from '../../components/CreateNewComponent/CreateNewComponent';

function AbilityList({adminMode}) {

    const {
        data: ability,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAbilitiesQuery(null, {
        pollingInterval: 60000, // 60 seconds, requery data after specified time.
        refetchOnFocus: true, // collect data again if window has been changed (focus has switched)
        refetchOnMountOrArgChange: true // collect data if mount
    })


    let content;

    if (isLoading) content = <p>Loading...</p>
    if (isError) content = <p className='error-msg'>{error?.data?.message}</p>

    if (isSuccess) {
        const {ids} = ability
        const tableContent = ids?.length
        ? ids.map(abilityId => <Ability key={abilityId} abilityId={abilityId} adminMode={adminMode}/>)
        : null

        content = (
            <ul>
                <CreateNewComponent urlTo={'/admin/ability/create/'}/>
                {tableContent}
            </ul>

        )

    }

    return content;

}

export default AbilityList