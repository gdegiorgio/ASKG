export class QAnswerResponse implements EndpointResponse{
    knowledgeBase:string
    sparql_endpoint = "QAnswer"
    data:Object
}