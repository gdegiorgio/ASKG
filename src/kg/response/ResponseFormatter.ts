import ResponseAnalyzer from "./ResponseAnalyzer";

export default class ResponseFormatter{
    formatResponse(responses:EndpointResponse[]){
        console.log("Reformatting response")
        let analyzer = new ResponseAnalyzer()
        analyzer.analyzeResponses(responses)
        return responses
    }
}