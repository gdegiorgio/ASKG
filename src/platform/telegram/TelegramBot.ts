import { Context, Telegraf } from "telegraf";
import { KGBroker } from "../../kg/KGBroker";
import { Bot } from "../Bot";
import localStorage from 'localStorage'
export class TelegramBot implements Bot{


    private telegramBot:Telegraf
    nlp_processor:NLPProcessor
    intent_recognizer: IntentRecognizer;
    kg_broker:KGBroker

    constructor(){
        this.telegramBot = new Telegraf(process.env.TELEGRAM_TOKEN)
    }

    public run(): void {
        
        
        this.telegramBot.command("/start", async(ctx:Context)=>{this.onStart(ctx)})
        this.telegramBot.command("/ask", async(ctx:Context)=>{this.onAsk(ctx)})
        console.log("Starting telegram bot...")
        this.telegramBot.launch();


    }


    // Context type doesn't compile
    private async onAsk(context:any){
        let message = context.message
        let splitCmd:string[]= message.text.split("/ask")
        if (splitCmd.length != 2){
            context.reply(this.getHelpText())
            return
        }



        localStorage.setItem("user_query", splitCmd[1])


        let query = []
        if(this.nlp_processor !== undefined )
            query = await this.nlp_processor.process(splitCmd[1])
        else
            query = [splitCmd[1]]


        

        let res:string = await this.kg_broker.runQuery("")
        context.reply(res)
    }

    private onStart(context:Context){
        context.reply("Welcome to ASKG telegram bot, start with /ask command")
    }

    private getHelpText():string{
        return "/ask usage:   /ask <question>"
    }

}