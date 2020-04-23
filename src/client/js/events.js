import { getAnalysisData, getAnalysisDataUrl } from './aylien.js'
import { transformData } from './data.js'

const button = document.getElementById('submit__button')
const textInput = document.querySelector('#input__text')
const urlInput = document.querySelector('#input__url')
const errorText = document.querySelector('#error__identifier')

const perLanguage = document.querySelector('#text__confidence')
const language = document.querySelector('#result__lang')

const perClassify = document.querySelector('#text__classify__confidence')
const classify = document.querySelector('#result__classify')

const perSentiment = document.querySelector('#text__sentiment__confidence')
const sentiment = document.querySelector('#result__sentiment')

const entitiies = document.querySelector('#entitiy__wrapper')
const summarize = document.querySelector('#result__summarize')

const results = document.querySelector('.dash__inactive')
const loading = document.querySelector('.circle__animation')

function verfiyInput() {
    
    if (urlInput.value == '' && textInput.value == '') {
        return false
    } else if (urlInput.value != '' && textInput.value == '') {
        return {
            input: 'Url',
            bool: true
        }
    } else if (urlInput.value == '' && textInput.value != '') {
        return {
            input: 'Text',
            bool: true
        }
    }
    return true
}

function removeContent() {
    perLanguage.textContent = ''
    language.textContent = ''
    
    perClassify.textContent = ''
    classify.textContent = ''
    
    perSentiment.textContent = ''
    sentiment.textContent = ''
    
    entitiies.textContent = ''
    summarize.textContent = ''
}

function startloading() {
    loading.classList.add('circle__animation')
    results.classList.add('dash__inactive')
}

function endloading() {
    loading.classList.remove('circle__animation')
    results.classList.remove('dash__inactive')

    loading.classList.add('circle__inactive')
    results.classList.add('result__container')
}

async function updateUI() {

    const verfiy = verfiyInput();
    if (!verfiy) {
        textInput.classList.toggle('swiggle__error__shake')
        urlInput.classList.toggle('swiggle__error__shake')
        errorText.classList.toggle('error__text')
        return;
    } else {
        errorText.classList.add('error__text')
        textInput.classList.remove('swiggle__error__shake')
        urlInput.classList.remove('swiggle__error__shake')
    }

    removeContent();
    startloading();

    const response = await getAnalysisData(textInput.value || urlInput.value)
    const transform = transformData(response)

    try {
        perLanguage.textContent = transform.language.conf
        language.textContent = transform.language.lang
        
        perClassify.textContent = transform.classify.conf
        classify.textContent = transform.classify.classify
        
        perSentiment.textContent = transform.sentiment.conf
        sentiment.textContent = transform.sentiment.sentiment
        
        entitiies.appendChild(transform.entity.entities)
        summarize.textContent = transform.summarize

    } catch (err) {
        console.log(err)
    }

    endloading();
}

button.addEventListener('click', () => {
    console.log('fired')
    updateUI();
})

export { updateUI, verfiyInput, startloading,  endloading}