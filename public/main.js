document.getElementById('updateButton').addEventListener('click', updateEntry)
document.getElementById('deleteButton').addEventListener('click', deleteEntry)

async function updateEntry() {
    try{
        const response = await fetch('updateEntry', {
            method: 'put',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
                speciesName: document.getElementsByName('speciesName')[0].value,
                features: document.getElementsByName('features')[0].value,
                homeworld: document.getElementsByName('homeworld')[0].value,
                image: document.getElementsByName('image')[0].value,
                interestingFact: document.getElementsByName('interestingFact')[0].value,
                notableExamples: document.getElementsByName('notableExamples')[0].value,
            })
        })

        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
   
}

async function deleteEntry(){
    const input = document.getElementById('deleteInput')
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
                speciesName: input.value
            })
        })
        const data = await response.json()
        location.reload()
    }catch (err){
        console.log(err)
    }
}