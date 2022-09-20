import { Context, Telegraf } from "telegraf";

export class TelegramBot implements Bot{


    private telegramBot:Telegraf
    nlp_processor:NLPProcessor
    intent_recognizer: IntentRecognizer;

    constructor(){
        this.telegramBot = new Telegraf(process.env.TELEGRAM_TOKEN)
    }

    public run(): void {
        
        
        this.telegramBot.command("/start", async(ctx:Context)=>{this.onStart(ctx)})
        this.telegramBot.command("/ask", async(ctx:Context)=>{this.onAsk(ctx)})
        console.log("Starting telegram bot...")
        this.telegramBot.launch();


    }


    private onAsk(context:Context){
        context.reply("Bot under development")
    }

    private onStart(context:Context){
        context.reply("Welcome to ASKG telegram bot, start with /ask command")
    }

}