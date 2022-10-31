import { credentials } from '@config/credentials';
import { REST, Routes } from 'discord.js';
import { dictionaryBuild } from './builders/dictionary.build';

export const registerCommands = async (rest: REST) => {
  const commands = [dictionaryBuild];
  try {
    console.log(`Started refreshing application (/) commands.`);

    await rest.put(
      Routes.applicationGuildCommands(credentials.botId, credentials.guildId),
      { body: commands },
    );

    console.log(`Successfully reloaded application (/) commands.`);
  } catch (error) {
    console.error;
    throw error;
  }
};
