import { DBpediaResponse } from "./DBpediaResponse";
import SparqlClient from "sparql-http-client";

export class DbpediaEndpoint implements SparqlEndpoint {



    async runQuery(sparql_query: string): Promise<EndpointResponse> {
        return new Promise(async (resolve) => {
            var url = "https://dbpedia.org/sparql/"
            let response: DBpediaResponse = new DBpediaResponse();
            response.data = {}



            let mock_query = 'SELECT ?concept WHERE { ?concept rdfs:label "Alan Turing"@en}'
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