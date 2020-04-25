import { transformNumber, transformData } from './data.js'
import { getAnalysisData } from './aylien.js'
import 'babel-polyfill'

const testjson = {
    text: "Hello this is a ver very positive sample text",
    results: [
        {
            "endpoint": "language",
            "result": {
                "lang": "en",
                "confidence": 0.9999967581173261
            }
        },
        {
            "endpoint": "entities",
            "result": {
                "language": "en",
                "entities": {
                    "keyword": [
                        "positive sample text",
                        "text",
                        "sample",
                        "positive"
                    ]
                }
            }
        },
        {
            "endpoint": "classify",
            "result": {
                "language": "en",
                "categories": [
                    {
                        "label": "lifestyle and leisure - beauty",
                        "code": "10016000",
                        "confidence": 0.47
                    }
                ]
            }
        },
        {
            "endpoint": "sentiment",
            "result": {
                "polarity": "positive",
                "subjectivity": "unknown",
                "polarity_confidence": 0.6808465123176575,
                "subjectivity_confidence": 0
            }
        },
        {
            "endpoint": "summarize",
            "result": {
                "sentences": []
            }
        }
    ]
}

test('convert number to percent', () => {
    expect(transformNumber(0.79)).toBe(79)
})

test('convert number to percent and round it', () => {
    expect(transformNumber(0.79889283)).toBe(80)
})

test('convert json', () => {
    expect(transformData(testjson)).toEqual(
        expect.objectContaining ({
        classify: expect.any(Object),
        entity: expect.any(Object),
        language: expect.any(Object),
        sentiment: expect.any(Object),
        summarize: expect.any(String)
        })
    )
})

test('Aylien Api', async () => {
    getAnalysisData((testjson), result => {
        expect(result).toEqual(
            expect.objectContaining({
                result: expect.any(Array)
            })
        )
        done();
    })
})