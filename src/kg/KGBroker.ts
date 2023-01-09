export class KGBroker{
    endpoints:SparqlEndpoint[]
    constructor(endpoints:SparqlEndpoint[]){
        this.endpoints=endpoints
    }

    async runQuery(query:string):Promise<EndpointResponse[]>{
        return new Promise(async(resolve)=>{
            let response:EndpointResponse[] = [];
            for(let endpoint of this.endpoints){
                let endpointReponse = await endpoint.runQuery(query);
                response.push(endpointReponse);
            }
            resolve(response) 
        })
    }
}