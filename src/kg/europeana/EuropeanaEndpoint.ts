import EuropeanaResponse from "./EuropeanaResponse"
import localStorage from 'localStorage'
import SparqlClient from "sparql-http-client";

export default class EuropeanaEndpoint implements SparqlEndpoint{
    runQuery(sparql_query: string): Promise<EndpointResponse> {
        return new Promise(async(resolve)=>{
            var url = 'http://sparql.europeana.eu/' 
            let response: EuropeanaResponse = new EuropeanaResponse();
            response.data = {}



            let mock_query =   `
            PREFIX edm: <http://www.europeana.eu/schemas/edm/>
            SELECT ?DataProvider
            WHERE { ?Aggregation edm:dataProvider ?DataProvider }
            
                `
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