import { Client, Interaction, REST, Routes } from "discord.js";
import { KGBroker } from "../../kg/KGBroker";
import { Bot } from "../Bot";
import { CommandList } from "./CommandList";

export class DiscordBot implements Bot{

    private discordClient:Client
    nlp_processor:NLPProcessor
    intent_recognizer: IntentRecognizer;
    kg_broker:KGBroker

    constructor(){
        this.discordClient = new Client({intents: ["Guilds"]});
    }

    public async run(){

        this.discordClient.on("ready", () => {this.onClientReady()})
        this.discordClient.on("interactionCreate", (interaction:Interaction) => { this.onInteractionCreated(interaction)})
        await this.discordClient.login(process.env.DISCORD_TOKEN);

    }

    private async onClientReady(){
        const rest = new REST({ version: "9" }).setToken(
            process.env.DISCORD_TOKEN as string
          );
        const commandData = CommandList.map((command) => command.data.toJSON());

        await rest.put(
            Routes.applicationGuildCommands(
              this.discordClient.user?.id || "missing id",
              process.env.DISCORD_GUILD_ID as string
            ),
            { body: commandData }
          );
        
          console.log("Starting discord bot...");
    }

    private async onInteractionCreated(interaction:Interaction){
        if (interaction.isCommand()) {
            for (const Command of CommandList) {
              if (interaction.commandName === Command.data.name) { 
                await Command.run(interaction);
                break;
              }
            }
          }
    }
}