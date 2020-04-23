async function getAnalysisData(input) {

    const data = await fetch (`http://localhost:3030/api/combined?text=${input}`)

    try {
        const res = await data.json();
        return res
    } catch (err) {
        console.log(err)
    }
}

async function getAnalysisDataUrl(input) {

    const data = await fetch (`http://localhost:3030/api/combined?url=${input}`)

    try {
        const res = await data.json();
        return res
    } catch (err) {
        console.log(err)
    }
}

export { getAnalysisData, getAnalysisDataUrl }