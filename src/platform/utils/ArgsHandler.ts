import { DbpediaEndpoint } from "../../kg/dbpedia/DBpediaEndpoint";
import { KGBroker } from "../../kg/KGBroker";
import ArcoEndpoint from "../../kg/arco/ArcoEndpoint";
import { QAnswerEndpoint } from "../../kg/qanswer/QAnswerEndpoint";
import { WikidataEndpoint } from "../../kg/wikidata/WikidataEndpoint";
import { NLPjsIntentRecognizer } from "../../nlp/intent/NLPjsIntentRecognizer";
import { QAnswerProcessor } from "../../nlp/processor/QAnswerProcessor";
import { Bot } from "../Bot";
import { DiscordBot } from "../discord/DiscordBot";
import { SlackBot } from "../slack/SlackBot";
import { TelegramBot } from "../telegram/TelegramBot";
import EuropeanaEndpoint from "../../kg/europeana/EuropeanaEndpoint";


export class ArgsHandler{


     handleArgs(){
        let args:string[] = process.argv.slice(2);
        let platformCount:number = 0;
        let knowledgeBaseCount:number = 0;
        let processorSelected:boolean = false;
        let intentRecognizerSelected=false;
        let knowledgeBases:string[] = [];
        let bots:Bot[] = []
        let processor:NLPProcessor;
        let intentRecognizer:IntentRecognizer;
        let broker:KGBroker 
        let endpoints:SparqlEndpoint[] = []

        console.log(args)

        if(args.includes("-telegram")){
            platformCount++;
            let telegramBot = new TelegramBot();
            bots.push(telegramBot)

            //telegramBot.run();
        }
        if(args.includes("-discord")){
           platformCount++;
           let discordBot=new DiscordBot();
           bots.push(discordBot)
        }
        if(args.includes("-slack")){
            platformCount++;
            let slackBot = new SlackBot();
            bots.push(slackBot)
            knowledgeBaseCount++;
        }
        if(args.includes("-dbpedia")){
            knowledgeBases.push("dbpedia")
            knowledgeBaseCount++;
            endpoints.push(new DbpediaEndpoint())
            

        }


        if(args.includes("-arco")){
            knowledgeBases.push("arco")
            knowledgeBaseCount++;
            endpoints.push(new ArcoEndpoint())
        }


        if(args.includes("-europeana")){
            knowledgeBases.push("europeana")
            knowledgeBaseCount++;
            endpoints.push(new EuropeanaEndpoint())
        }

        if(args.includes("-wikidata")){
            knowledgeBases.push("wikidata")
            knowledgeBaseCount++;
            endpoints.push(new WikidataEndpoint())
        }
        if(args.includes("-qanswer_dbpedia")){
            knowledgeBaseCount++;
            let qanswer_endpoint:QAnswerEndpoint = new QAnswerEndpoint()
            qanswer_endpoint.knowledge_base="dbpedia";
            endpoints.push(qanswer_endpoint)

        }
        if(args.includes("-qanswer_wikidata")){
            knowledgeBaseCount++;
            let qanswer_endpoint:QAnswerEndpoint = new QAnswerEndpoint()
            qanswer_endpoint.knowledge_base="wikidata";
            endpoints.push(qanswer_endpoint)
        }
        if(args.includes("-qanswer")){
            processorSelected=true;
            processor = new QAnswerProcessor(knowledgeBases);
        }
        if(args.includes("-nlpjs")){
            intentRecognizerSelected=true;
            intentRecognizer=new NLPjsIntentRecognizer();
        }




        if(!platformCount){
            console.error("You need to specify at least one platform")
            this.printHandler();
            return;
        }
        /*if(!processorSelected){
            console.error("You need to specify at least one processor")
            this.printHandler();
            return;
        }*/
        if(!knowledgeBaseCount){
            console.error("You need to specify at least one knowledge base")
            this.printHandler();
            return;
        }
        if(!intentRecognizerSelected){
            console.error("You need to specify an intent recognizer")
            this.printHandler();
            return;
        }


        broker = new KGBroker(endpoints)
        this.runBots(bots, processor, intentRecognizer,broker);
    }



    private printHandler(){
        let helpMsg =  ` 
            ASKG usage:

            # Platforms

            -discord : Start bot on discord 
            -telegram : Start bot on telegram 
            -slack: Start bot on slack 


            # Processor

            -qanswer : QAnswer will process the question and generate SPARQL query

            # Intent Recognizer

            -nlpjs : use nlpjs library as intent recognizer


            # Knowledge Base

            -dbpedia : Will query DBpedia Sparql Endpoint
            -wikidata : Will query Wikidata Sparql Endpoint
            -qanswer_dbpedia : Will query Dbpedia thourgh QAnswer
            -qanswer_wikidata : Will query Wikidata thourgh QAnswer
        
        `

        console.log(helpMsg)
    }

    private runBots(bots:Bot[], processor:NLPProcessor, intentRecognizer:IntentRecognizer, broker:KGBroker){
        for(let bot of bots){
            bot.kg_broker=broker;
            bot.nlp_processor=processor;
            bot.intent_recognizer=intentRecognizer;
            bot.run();
        }
        
    }
}
