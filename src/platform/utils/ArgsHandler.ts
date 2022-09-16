import { DiscordBot } from "../discord/DiscordBot";
import { SlackBot } from "../slack/SlackPlatform";
import { TelegramBot } from "../telegram/TelegramPlatform";

export class ArgsHandler{


     handleArgs(){
        let args = process.argv.slice(2);
        let platformCount = 0;

        if(args.includes("-telegram")){
            platformCount++;
            let telegramBot = new TelegramBot();
            telegramBot.run();
        }
        if(args.includes("-discord")){
           platformCount++;
           let discordBot=new DiscordBot();
           discordBot.run();
        }
        if(args.includes("-slack")){
            platformCount++;
            let slackBot = new SlackBot();
            slackBot.run();
        }



        if(!platformCount){
            console.error("You need to specify at least one platform")
            this.printHandler();
        }
    }



    private printHandler(){
        let helpMsg =  ` 
            ASKG usage:

            # Platforms

            -discord : Start bot on discord 
            -telegram : Start bot on telegram 
            -slack: Start bot on slack 
        
        `

        console.log(helpMsg)
    }
}
