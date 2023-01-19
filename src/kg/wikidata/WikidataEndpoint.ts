
import { WikidataResponse } from "./WikidataResponse";
import SparqlClient from "sparql-http-client";

export class WikidataEndpoint implements SparqlEndpoint{
    runQuery(sparql_query: string): Promise<EndpointResponse> {
        return new Promise(async(resolve)=>{
            var url = 'https://query.wikidata.org/sparql' 
            let response: WikidataResponse = new WikidataResponse();
            response.data = {}

            console.log("Generated Wikidata Query : ", sparql_query)
            let client = new SparqlClient({ endpointUrl: url });
            let dataStream = await client.query.select(sparql_query);
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