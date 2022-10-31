import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';

export const dictionaryBuild = {
  name: 'dictionary',
  description:
    'View the meaning of terms related to NFT Havaianas',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'term',
      type: ApplicationCommandOptionType.String,
      description: 'Enter the term you want to know',
      required: true
    }
  ]
};
