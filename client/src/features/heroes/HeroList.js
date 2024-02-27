import React from 'react'
import { useGetHeroesQuery } from './HeroesApiSlice';
import Hero from './Hero'

function HeroList() {

    const {
        data: hero,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetHeroesQuery()


    let content;

    if (isLoading) content = <p>Loading...</p>
    if (isError) content = <p className='error-msg'>{error?.data?.message}</p>

    if (isSuccess) {
        const {ids} = hero
        const tableContent = ids?.length
        ? ids.map(heroId => <Hero key={heroId} heroId={heroId} />)
        : null

        content = (
            <ul>
                {tableContent}
            </ul>

        )

    }

    return content;

}

export default HeroList