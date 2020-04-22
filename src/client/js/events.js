import { getAnalysisData } from './aylien.js'

const button = document.getElementById('submit__button')
const testInput = document.getElementById('test')

async function updateUI() {

    const response = await getAnalysisData()

    try {
        console.log(response)
        testInput.innerHTML = response
    } catch (err) {
        console.log(err)
    }
}

button.addEventListener('click', () => {
    console.log('fired')
    updateUI();
})

export { updateUI }