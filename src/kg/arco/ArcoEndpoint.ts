import ArcoResponse from "./ArcoResponse"
import localStorage from 'localStorage'
import SparqlClient from "sparql-http-client";

export default class ArcoEndpoint implements SparqlEndpoint{
    runQuery(sparql_query: string): Promise<EndpointResponse> {
        return new Promise(async (resolve) => {
            var url = "https://dati.cultura.gov.it/sparql"
            let response: ArcoResponse = new ArcoResponse();
            response.data = {}



            let mock_query = `PREFIX dc:<http://purl.org/dc/elements/1.1/>
            PREFIX arco:<https://w3id.org/arco/ontology/arco/>
            SELECT ?concept ?label where {
            
               ?concept rdf:type arco:HistoricOrArtisticProperty .
               ?concept rdfs:label ?label .
               ?concept dc:coverage "Caserta (CE)" . 
            
            } LIMIT 10`

            
            console.log("Generated Arco Query :" , mock_query)
            let client = new SparqlClient({ endpointUrl: url });
            let dataStream = await client.query.select(mock_query);
            let res_arr = []
            dataStream.on("data", (data: any) => {
                res_arr.push(data)
                console.log(data)
            })
            dataStream.on("end", () => {
                response.data = {"results": res_arr }
                resolve(response)
            })

        })
    }
}