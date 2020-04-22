import { getAnalysisData } from './aylien.js'

const button = document.getElementById('submit__button')
const textInput = document.querySelector('#input__text')
const urlInput = document.querySelector('#input__url')

const perLanguage = document.querySelector('#text__confidence')
const language = document.querySelector('#result__lang')

const perClassify = document.querySelector('#text__classify__confidence')
const classify = document.querySelector('#result__classify')

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
        perLanguage.textContent = `${(Math.round(response.results[0].result.confidence)) * 100} %`
        language.textContent = response.results[0].result.lang
        perClassify.textContent = `${(response.results[2].result.categories[0].confidence) * 100} %`
        classify.textContent = response.results[2].result.categories[0].label
        
    } catch (err) {
        console.log(err)
    }
}

button.addEventListener('click', () => {
    console.log('fired')
    updateUI();
})

export { updateUI, verfiyInput }