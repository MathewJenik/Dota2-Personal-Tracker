import React from 'react'
import { useGetHeroesQuery } from './HeroesApiSlice';
import Hero from './Hero'
import CreateNewComponent from '../../components/CreateNewComponent/CreateNewComponent';

function HeroList({adminMode}) {

    const {
        data: hero,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetHeroesQuery()


    let content;

    if (isLoading) content = <p>Loading...</p>
    
    if (isError && error?.data?.message != "No Heroes Found.") {
        content = <p className='error-msg'>{error?.data?.message}</p>
    } else if (isError && error?.data?.message == "No Heroes Found." && adminMode == true) {
        content = <CreateNewComponent urlTo="/admin/hero/create/" />
    }


    if (isSuccess) {
        const {ids} = hero
        const tableContent = ids?.length
        ? ids.map(heroId => <Hero key={heroId} heroId={heroId} adminMode={adminMode}/>)
        : null

        content = (
            <ul>
                {(adminMode && (
                    <CreateNewComponent urlTo="/admin/hero/create/" />
                ))}
                {tableContent}
            </ul>

        )

    }

    return content;

}

export default HeroList