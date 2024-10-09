import { City } from "@/types";
import { Trie } from "./trie";

const TEST = `city_id,city_name,state_code,country_code,country_full,lat,lon
7874479,Trindade,26,BR,Brazil,-27.58612,-48.52335
11184422,Planaltina,07,BR,Brazil,-15.61791,-47.64874
3571824,Nassau,23,BS,"Bahamas, The",25.05823,-77.34306
3571971,Lucaya,25,BS,"Bahamas, The",26.53333,-78.66667
3572375,Freeport,25,BS,"Bahamas, The",26.53333,-78.7
1252416,Thimphu,20,BT,Bhutan,27.46609,89.64191
1252479,Punākha,15,BT,Bhutan,27.59137,89.87743
672024,Ocna Mureş,01,RO,,46.38333,23.85
672486,Năvodari,14,RO,,44.31667,28.6
672757,Motru,19,RO,,44.80333,22.97194
672862,Moreni,16,RO,,44.98301,25.64415
673033,Mizil,30,RO,,45.01667,26.45
673441,Miercurea-Ciuc,20,RO,,46.35,25.8
673634,Mediaş,33,RO,,46.16667,24.35
673636,Medgidia,14,RO,,44.25,28.28333`

const TEST2 = `city_id,city_name,state_code,country_code,country_full,lat,lon
3871336,Santiago,12,CL,Chile,-33.45694,-70.64827
3571824,Nassau,23,BS,"Bahamas, The",25.05823,-77.34306
3571971,Lucaya,25,BS,"Bahamas, The",26.53333,-78.66667
3572375,Freeport,25,BS,"Bahamas, The",26.53333,-78.7
3081046,Ząbkowice Śląskie,72,PL,,50.58969,16.81239
3081324,Września,86,PL,,52.32512,17.56519
3081368,Wrocław,72,PL,,51.1,17.03333
3871336,Santiago,12,CL,Chile,-33.45694,-70.64827
3081677,Wodzisław Śląski,83,PL,,50.00377,18.47205
3081741,Włocławek,73,PL,,52.64817,19.0678
3871336,Santiago,12,CL,Chile,-33.45694,-70.64827`

export interface CSVIndexer {
    search: (search: string, wordCount: number) => City[]
}

export async function loadCSV(url: string) {
    let csvDataByLine: string[] = []
    let csvDataHeaders: string[] = []
    const citiesTrie: Trie = new Trie()

    try {
        const csvData = await fetch(url)
        const csvDataAsText = await csvData.text()
        csvDataByLine = csvDataAsText.split('\n').filter(line => line !== '')
        // csvDataByLine = TEST2.split('\n').filter(line => line !== '')
        const headersLine = csvDataByLine.shift()
        csvDataHeaders = headersLine ? headersLine.split(','): []
        csvDataByLine.forEach((line, index) => {
            const fields = csvLineToFieldsStateMachine(line, csvDataHeaders.length)
            // console.log(`${line} =>`, fields)
            if(fields[1])
                citiesTrie.insert(fields[1], index)
            else
                console.warn(`Failed insertion`, {index, line, fields})
        })
    } catch (e) {
        console.error(e)
    }

    return {
        search: function (search: string, wordCount: number = 10) {
            const references = citiesTrie.getReferencesFrom(search, wordCount)
            const resolvedReferences =  references.map((reference) => {
                return reformCityObject(csvDataHeaders, csvDataByLine[reference])
            })
            // console.log('References', {references, resolvedReferences})
            resolvedReferences.sort((a, b) => {
                // console.log(`city length ${a.city_name}:${a.city_name.length} - ${b.city_name}:${b.city_name.length}`)
                return a.city_name.length - b.city_name.length
            })
            return resolvedReferences
        }
    }
}

function reformObject(headers: string[], data: string) {
    const splitData = csvLineToFieldsStateMachine(data, headers.length)
    const reformedObject: {[key: string]: string} = {}
    for(let i = 0 ; i < headers.length ; i++) {
        reformedObject[headers[i]] = splitData[i]
    }
    return reformedObject
}

function reformCityObject(headers: string[], data: string): City {
    const splitData = csvLineToFieldsStateMachine(data, headers.length)
    const reformedObject: City = {
        city_id: splitData[0],
        city_name: splitData[1],
        state_code: splitData[2],
        country_code: splitData[3],
        country_full: splitData[4],
        lat: splitData[5],
        lon: splitData[6],
    }
    return reformedObject
}

function csvLineToFieldsStateMachine(input: string, headersLength: number): string[] {
    const SEPARATOR = ','
    const CONTAINER = '"'
    let state = 0
    const resultArray: string[] = []
    let currentField = ''

    for(let i = 0; i < input.length ; i++) {
        const char = input[i]

        switch (state) {
            // Initial state
            case 0: {
                if (char === SEPARATOR) {
                    resultArray.push(currentField)
                    currentField = ''
                    continue
                }
                if  (char === CONTAINER) {
                    // debugger
                    state = 1
                    continue
                }
                currentField += char
                break;
            }

            case 1: {
                if  (char === CONTAINER) {
                    state = 0
                    continue
                }
                currentField += char
                break;
            }

            default:
                break;
        }
    }
    resultArray.push(currentField)
    return resultArray
}