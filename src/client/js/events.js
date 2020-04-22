import { getAnalysisData } from './aylien.js'

const button = document.getElementById('submit__button')
const testInput = document.getElementById('test')
const textInput = document.querySelector('#input__text')
const urlInput = document.querySelector('#input__url')

function verfiyInput() {
    
    if (urlInput.value == '' && textInput.value == '') {
        console.log('Please provide Input')
        return false
    }
    return true
}

async function updateUI() {

    const verfiy = verfiyInput();
    if (!verfiy) {
        //rule for styling jiggle etc.
        return;
    }

    const response = await getAnalysisData(textInput.value || urlInput.value)

    try {
        console.log(response)
        testInput.innerHTML = response.text
    } catch (err) {
        console.log(err)
    }
}

button.addEventListener('click', () => {
    console.log('fired')
    updateUI();
})

export { updateUI, verfiyInput }