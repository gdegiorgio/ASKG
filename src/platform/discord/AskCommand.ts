import { SlashCommandBuilder } from "@discordjs/builders";
import { KGBroker } from "../../kg/KGBroker";
import { Command } from "./Command";

import localStorage from 'localStorage'

export const ask:Command = {
    data: new SlashCommandBuilder().setName("ask")
                .setDescription("This command ask something to the bot")
                .addStringOption((options) => options.setName("message").setDescription("Your question").setRequired(true)),
            
                run : async(interaction:any) => {
                    let message = interaction.options.get("message").value
                    console.log(JSON.stringify(localStorage))
                    let broker = interaction.broker
                    let res:string = await broker.runQuery("")
                    console.log("Sending back response")
                    interaction.reply(res)
    }

}
