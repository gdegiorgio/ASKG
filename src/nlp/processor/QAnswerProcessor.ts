import axios from "axios";

export class QAnswerProcessor implements NLPProcessor{

    private authURL:string = "http://qanswer-core1.univ-st-etienne.fr/api/user/signin";
    private queryURL:string = "http://qanswer-core1.univ-st-etienne.fr/api/qa/sparql";
    private accessToken:string
    private knowledgeBases:string[];

    constructor(knowledgeBases:string[]){
        this.knowledgeBases=knowledgeBases;
    }

    async process(question:string):Promise<object[]>{
        this.accessToken = await this.getToken();
        let data = this.getSPARQLQueries(question);
        return data;

    }


    private async getToken():Promise<string>{
        let body = {
            "usernameOrEmail": process.env.QANSWER_USER, "password": process.env.QANSWER_PASSWORD
        }

        let config = {
            "async": true,
            "crossDomain": true,
            "headers": {
                "Content-Type": "application/json"
            },
        }
        let response = await axios.post(this.authURL,body,config)
        return response.data.accessToken;
    }

    private async getSPARQLQueries(question:string){
        let data : object[] = []
        for(let knowledgeBase of this.knowledgeBases){
            let config = {
                params: {
                    "question": question,
                    "lang": "en",
                    "kb": knowledgeBase
                },
                headers: {
                    "Authorization": "Bearer " + this.accessToken
                }
        }
        let response:any = await axios.get(this.queryURL,config).catch(function(error){console.log(error)});
        let sparql = response.data.queries[0].query;
        data.push({knowledgeBase : knowledgeBase, SPARQL: sparql});
        }
       
        return data;
    }
}