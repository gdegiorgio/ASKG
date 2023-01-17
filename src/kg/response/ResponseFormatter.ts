import { stringify } from "querystring";
import ResponseAnalyzer from "./ResponseAnalyzer";

export default class ResponseFormatter{
    formatResponse(responses:EndpointResponse[]): string{
        let analyzer = new ResponseAnalyzer()
        // Not implemented
        analyzer.analyzeResponses(responses)

        console.log(JSON.stringify(responses,null,4))
        let res_body = "";
        for(const response of responses){
            if(response.endpoint != undefined && response.data != new Object()){
                res_body += "Found some info on " + response.endpoint + ":\n\n" 
                for(const result of response.data.results){
                        res_body+=result.birthdate.value+"\n\n"
                }
            }
        }

        let res = res_body == ""?"Could not retrieve any info": "Here are some info:\n\n" + res_body
        return res
    }
}