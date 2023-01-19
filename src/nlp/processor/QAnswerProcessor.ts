import axios from "axios";

export class QAnswerProcessor implements NLPProcessor{

    private authURL:string = "https://app.qanswer.ai/api/user/signin";
    private queryURL_DBPEDIA_WIKIDATA:string = "https://qanswer-core1.univ-st-etienne.fr/api/qa/full";
    private queryURL:string = "https://app.qanswer.ai/api/qa/full";
    private accessToken:string
    private knowledgeBases:string[];
    constructor(knowledgeBases:string[]){
        this.knowledgeBases=knowledgeBases;
    }

    async process(question:string):Promise<any>{
        return new Promise(async (resolve) => {

            let token = await this.getToken()
            let result_query = this.getSPARQLQueries(question,token)
            resolve(result_query)
        })

    }


    private async getToken():Promise<string>{
        return new Promise(async(resolve) => {
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
        resolve( response.data.accessToken);
        })
    }

    private async getSPARQLQueries(question:string, token:String){
        return new Promise(async (resolve) => {
            let data : object[] = []
            for(let knowledgeBase of this.knowledgeBases){
                let config = {
                    params: {
                        "question": question,
                        "lang": "en",
                        "kb": knowledgeBase,
                        "user" : "open",
                        "timeout" : 5
                    },
                    headers: {
                        "Authorization": "Bearer " + token
                    }
            }
                let url = knowledgeBase.toUpperCase().includes("DBPEDIA") || knowledgeBase.toUpperCase().includes("WIKIDATA") ? this.queryURL_DBPEDIA_WIKIDATA: this.queryURL
                let response = await axios.get(url,config)
                data.push({knowledgeBase:knowledgeBase, sparql: response.data.queries[0].query})
            }
            resolve(data);
        })
    }
}