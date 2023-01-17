
import { WikidataResponse } from "./WikidataResponse";
import SparqlClient from "sparql-http-client";

export class WikidataEndpoint implements SparqlEndpoint{
    runQuery(sparql_query: string): Promise<EndpointResponse> {
        return new Promise(async(resolve)=>{
            var url = 'https://query.wikidata.org/sparql' 
            let response: WikidataResponse = new WikidataResponse();
            response.data = {}



            let mock_query = `SELECT ?concept ?birthdate WHERE {

                ?concept rdfs:label "Elizabeth II"@en . 
                ?concept wdt:P569 ?birthdate . 
               
               }`
            console.log("Generated Wikidata Query : ", mock_query)
            let client = new SparqlClient({ endpointUrl: url });
            let dataStream = await client.query.select(mock_query);
            let res_arr = []
            dataStream.on("data", (data: any) => {
                res_arr.push(data)
                console.log(data)
            })
            dataStream.on("end", () => {
                response.data = { "results": res_arr }
                resolve(response)
            })

        })
    }
}