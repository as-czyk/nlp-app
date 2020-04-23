function transformNumber(num) {
    let raw = num * 100
    return Math.round(raw)
}

function makeList (array) {

    const list = document.createElement('span')
    let item = document.createElement('p')

    for (let i = 0; i < array.length; i++) {

        item.appendChild(document.createTextNode(`${array[i]}, `))
        list.appendChild(item)
    }
    return list;
}

function transformData (data) {

    const results = data.results
    let langConf, lang, entity, classify, classConf, sentiment, sentimentConf, summarize;

    results.forEach(element => {
        if(element.endpoint == "language") {
            lang = results[0].result.lang;
            langConf = transformNumber(results[0].result.confidence)
        } else if (element.endpoint == 'entities') {
            try {
                entity = makeList(results[1].result.entities.keyword)
                if (entity == undefined || entity == '' || results[1].result.entities == '') {
                    entity = 'No Keywords available'
                }
            } catch(err) {
                console.log(`Error ${err} has occured`)
            }
        } else if (element.endpoint == 'classify') {
            classify = results[2].result.categories[0].label
            classConf = transformNumber(results[2].result.categories[0].confidence)
        } else if (element.endpoint == 'sentiment') {
            sentiment = results[3].result.polarity;
            sentimentConf = transformNumber(results[3].result.polarity_confidence)
        } else {
            try {
                summarize = results[4].result.sentences
                if (summarize == undefined || summarize == '') {
                    summarize = 'No Summarize available'
                }
            }
            catch (err) {
                console.log(`Error ${err} has occured`)
            }
        }
    });

    const transformedData = {
        language: {
            lang: lang,
            conf: `${langConf} %`
        },
        entity: {
            entities: entity
        },
        classify: {
            classify: classify,
            conf: `${classConf} %`
        },
        sentiment: {
            sentiment: sentiment, 
            conf: `${sentimentConf} %`
        },
        summarize: summarize
    }
    return transformedData
}

export {transformData, transformNumber, makeList}