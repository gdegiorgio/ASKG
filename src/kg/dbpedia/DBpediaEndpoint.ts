import { DBpediaResponse } from "./DBpediaResponse";
import SparqlClient from "sparql-http-client";

export class DbpediaEndpoint implements SparqlEndpoint{



    async runQuery(sparql_query: string): Promise<EndpointResponse> {
       // var url = "https://dbpedia.org/sparql/" 
        let response:DBpediaResponse = new DBpediaResponse();
        response.data = {}

        // let client = new SparqlClient({endpointUrl:url});
        // let dataStream = await client.query.select(sparql_query);
        // dataStream.on("data", (data:object)=>{
        //     console.log(data)
        // })
        return response;
    }
}