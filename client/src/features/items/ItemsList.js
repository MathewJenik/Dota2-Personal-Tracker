import React from 'react'
import { useGetItemsQuery } from './ItemsApiSlice'
import Item from './Item'
import CreateNewComponent from '../../components/CreateNewComponent/CreateNewComponent';

function ItemList() {

    const {
        data: item,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetItemsQuery()


    let content;

    if (isLoading) content = <p>Loading...</p>
    if (isError) content = <p className='error-msg'>{error?.data?.message}</p>

    if (isSuccess) {
        const {ids} = item
        const tableContent = ids?.length
        ? ids.map(itemId => <Item key={itemId} itemId={itemId} adminMode={true}/>)
        : null

        content = (
            <ul>
                <CreateNewComponent />
                {tableContent}
            </ul>   
        )
    }

    return content;
}

export default ItemList