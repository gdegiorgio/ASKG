import { QAnswerResponse } from "./QAnswerResponse";


export class QAnswerEndpoint implements SparqlEndpoint{
    knowledge_base: string;
    runQuery(sparql_query: string): Promise<EndpointResponse> {
        return new Promise((resolve) => {
            let response:QAnswerResponse = new QAnswerResponse()
            response.knowledgeBase = this.knowledge_base
            response.data = {}
            resolve(response);
        })
    }
}