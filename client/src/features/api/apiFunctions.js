
export async function LoadAbility(id) {
    return await fetch(`http://localhost:3500/abilities/${id}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(async response => {
        const data = await response.json();
        return data;
    })
    .catch(error => {
        console.log(error);
    })
}
