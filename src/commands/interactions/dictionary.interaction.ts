import { dictionaryBuild } from '@commands/builders/dictionary.build';
import { Client, EmbedBuilder } from 'discord.js';
import { launch } from 'puppeteer';

export const dictionaryInteraction = (client: Client) => {
  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'dictionary') {
      await interaction.deferReply();
      let term = interaction.options.get(dictionaryBuild.options[0].name)
        ?.value as string;
      const whiteSpace = /\s/g.test(term);
      if (whiteSpace) {
        term = term.split(' ').join('-');
      }
      const url = `https://mhouse.club/dictionary/${term}/`;

      try {
        const browser = await launch();
        const page = await browser.newPage();
        console.log('iniciei!');

        await page.goto(url);

        console.log('fui para a URL');

        const def = await page.$eval(
          '.entry-content > p',
          element => element.innerText,
        );

        const embed = new EmbedBuilder()
          .setTitle(term)
          .setDescription(def)
          .setColor('Green')
          .setTimestamp();

        interaction.editReply({ embeds: [embed] });

        await browser.close();
      } catch {
        interaction.editReply('Termo não encontrado!');
      }
    }
  });
};
