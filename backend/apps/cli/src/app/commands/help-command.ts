import chalk from 'chalk';
import { Command } from './command.interface';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async execute(..._parameters: string[]): Promise<void> {
    const helpText = this.getCommandsFormat(`
          --help:                             # печатает этот текст
          --generate <n> <connection string>: # генерирует произвольное количество тестовых данных`);

    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            ${chalk.green('main.js --<command> [--arguments]')}
        Команды: ${helpText}
    `);
  }

  private getCommandsFormat(text: string): string {
    return text
      .split('\n')
      .map((line) => {
        if (!line.trim().length) {
          return line;
        }
        const textCols = line.split(':');
        return [chalk.blue(textCols[0]), textCols[1]].join(':');
      })
      .join('\n');
  }
}
