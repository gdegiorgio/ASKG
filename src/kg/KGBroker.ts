import ResponseFormatter from "./response/ResponseFormatter";

export class KGBroker{
    endpoints:SparqlEndpoint[]
    formatter:ResponseFormatter
    constructor(endpoints:SparqlEndpoint[]){
        this.endpoints=endpoints
        this.formatter = new ResponseFormatter()
    }

    async runQuery(query:string):Promise<string>{
        return new Promise(async(resolve)=>{
            let response:EndpointResponse[] = [];
            for(let endpoint of this.endpoints){
                let endpointReponse = await endpoint.runQuery(query);
                response.push(endpointReponse);
            }
            let result = this.formatter.formatResponse(response)
            resolve(result) 
        })
    }
}