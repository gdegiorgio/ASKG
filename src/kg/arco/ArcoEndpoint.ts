import ArcoResponse from "./ArcoResponse"
import localStorage from 'localStorage'
import SparqlClient from "sparql-http-client";

export default class ArcoEndpoint implements SparqlEndpoint{
    runQuery(sparql_query: string): Promise<EndpointResponse> {
        return new Promise(async (resolve) => {
            var url = "https://dbpedia.org/sparql/"
            let response: ArcoResponse = new ArcoResponse();
            response.data = {}



            let mock_query = 'SELECT ?x WHERE { ?x rdfs:label "Product Family" . }'
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