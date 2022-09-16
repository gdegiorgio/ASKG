import { SlackAdapter } from "botbuilder-adapter-slack";
import { Botkit, BotkitHandler, BotkitMessage, BotWorker } from "botkit";

export class SlackBot implements Bot{

    private slackBot:Botkit
    

    constructor(){
    }

    public run(): void {
        let adapter = new SlackAdapter({
            clientSigningSecret: process.env.SLACK_CLIENT_SECRET,
            botToken:process.env.SLACK_TOKEN
        })
        this.slackBot = new Botkit({adapter:adapter})
        this.slackBot.on("ready", async(worker:BotWorker, message:BotkitMessage)=>{this.onReady()})
        this.slackBot.hears("/ask",["message"], async(worker:BotWorker, message:BotkitMessage)=>{this.onMessage(worker,message)})
    }

    
    private onMessage(worker:BotWorker, message:BotkitMessage){
         worker.reply(message, "Under development");
    }

    private onReady(){
        console.log("Starting slack platform...")
    }
}