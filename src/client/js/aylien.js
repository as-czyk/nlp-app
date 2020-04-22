async function getAnalysisData() {

    const data = await fetch ('http://localhost:3030/api/combined')

    try {
        const res = await data.json();
        return res
    } catch (err) {
        console.log(err)
    }
}

export { getAnalysisData }