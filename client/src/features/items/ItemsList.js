import React from 'react'
import { useGetItemsQuery } from './ItemsApiSlice'
import Item from './Item'
import CreateNewComponent from '../../components/CreateNewComponent/CreateNewComponent';

function ItemList({adminMode}) {

    const {
        data: item,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetItemsQuery("itemsList", {
        pollingInterval: 60000, // 60 seconds, requery data after specified time.
        refetchOnFocus: true, // collect data again if window has been changed (focus has switched)
        refetchOnMountOrArgChange: true // collect data if mount
    })


    let content;

    if (isLoading) content = <p>Loading...</p>
    if (isError) content = <p className='error-msg'>{error?.data?.message}</p>

    if (isSuccess) {
        const {ids} = item
        const tableContent = ids?.length
        ? ids.map(itemId => <Item key={itemId} itemId={itemId} adminMode={adminMode}/>)
        : null

        content = (
            <>
            <h1 className='primary-heading'>Items</h1>
            
            <ul>
                {(adminMode && (
                    
                    <CreateNewComponent urlTo={'/admin/item/create/'}/>
                ))}
                {tableContent}
            </ul>   
            </>
        )
    }

    return content;
}

export default ItemList