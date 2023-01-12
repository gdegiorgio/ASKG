import EuropeanaResponse from "./EuropeanaResponse"
import localStorage from 'localStorage'
import SparqlClient from "sparql-http-client";
import axios
 from "axios";
export default class EuropeanaEndpoint implements SparqlEndpoint{
    runQuery(sparql_query: string): Promise<EndpointResponse> {
        return new Promise(async(resolve)=>{
            let response: EuropeanaResponse = new EuropeanaResponse();
            response.data = {}
            response.endpoint = "Europeana"


            //curl -X GET --header 'Accept: application/json' 'https://api.europeana.eu/record/v2/search.json?profile=standard&query=alan%20turing&rows=12&start=1&wskey=<KEY>'
            var url = 'https://api.europeana.eu/record/v2/search.json'
            let config = {
                headers: {
                    "Accept" : "application/json"
                },
                params: {
                    profile : "standard",
                    query : "Alan Turing Photo",
                    rows : 12,
                    start : 1,
                    wskey : "kideckell"
                }
            }
            console.log("Calling Europeana")
            axios.get(url, config).then((responses:any) => {
            
                let items = []
                console.log(responses)
                for(const res of responses.data.items){
                    items.push({concept: {
                        value: res.guid
                    }})
                }
                response.data = {results: items}
                resolve(response)
            })

        })
    }
}