
import { WikidataResponse } from "./WikidataResponse";

export class WikidataEndpoint implements SparqlEndpoint{
    runQuery(sparql_query: string): Promise<EndpointResponse> {
        return new Promise((resolve) => {
            let response:WikidataResponse = new WikidataResponse()
            response.data = {}
            resolve(response) ;
        })
    }
}