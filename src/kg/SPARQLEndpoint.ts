interface SparqlEndpoint{
    runQuery(sparql_query:string):Promise<EndpointResponse>
}