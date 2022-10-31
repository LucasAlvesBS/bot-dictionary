import { dictionaryBuild } from '@commands/builders/dictionary.build';
import translate from '@iamtraction/google-translate';
import { Client, EmbedBuilder } from 'discord.js';
import { launch } from 'puppeteer';

export const dictionaryInteraction = (client: Client) => {
  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'dictionary') {
      await interaction.deferReply();

      let term = interaction.options.get(
        dictionaryBuild.options[0].name.toLowerCase(),
      )?.value as string;

      const whiteSpace = /\s/g.test(term);
      if (whiteSpace) {
        term = term.split(' ').join('-');
      }

      const url = `https://mhouse.club/dictionary/${term}/`;

      try {
        const browser = await launch();
        const page = await browser.newPage();

        await page.goto(url);

        const definition = await page.$eval(
          '.entry-content > p',
          element => element.innerText,
        );

        const title = await page.$eval(
          '.entry-content > h1',
          element => element.innerText,
        );

        await browser.close();

        if (
          interaction.options.get(dictionaryBuild.options[1].name)?.value ===
          'pt'
        ) {
          const translated = await translate(definition, { to: 'pt' });

          const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(translated.text)
            .setColor('DarkNavy')
            .setTimestamp();

          interaction.editReply({ embeds: [embed] });
        } else {
          const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(definition)
            .setColor('DarkGold')
            .setTimestamp();

          interaction.editReply({ embeds: [embed] });
        }
      } catch {
        interaction.editReply('Termo não encontrado!');
      }
    }
  });
};
