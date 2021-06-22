const ascii = require("ascii-table");
const commandCheck = require("./../utils/commandCheck");
const table = new ascii().setHeading("command", "Load Status");
const figlet = require("figlet");
const chalk = require("chalk");

module.exports = (err, files, client) => {
  figlet.text("Privnote Bot", function (err, data) {
    console.log(data);
    console.log(chalk.blueBright("Made By: Tolba#0612"));
  });

  if (err) return console.error(err);
  files.forEach((file, index) => {
    const command = require(`./../commands/${file}`);
    if (commandCheck(command.name, command)) {
      if (command.name) {
        client.commands.set(command.name, command);
        table.addRow(command.name, "✔️");
        if (command.aliases && Array.isArray(command)) {
          command.aliases.foreach((alias) =>
            client.aliases.set(alias, command.name)
          );
        }
      } else {
        table.addRow(command.name, "❌");
      }
    }
    if (index == files.length - 1) console.log(table.toString());
  });
};
