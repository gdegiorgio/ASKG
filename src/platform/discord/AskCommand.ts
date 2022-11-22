import { SlashCommandBuilder } from "@discordjs/builders";
import { KGBroker } from "../../kg/KGBroker";
import { Command } from "./Command";


export const ask:Command = {
    data: new SlashCommandBuilder().setName("ask")
                .setDescription("This command ask something to the bot")
                .addStringOption((options) => options.setName("message").setDescription("Your question").setRequired(true)),
            
                run : async(interaction) => {
                    let message = interaction.options.get("message").value
                    
                    interaction.reply("Bot under development")
    }

}
