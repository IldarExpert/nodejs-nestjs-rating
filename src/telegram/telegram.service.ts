import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';
import { TelegramOptionsInterface } from './telegram.interface';

@Injectable()
export class TelegramService {
  bot: Telegraf;
  options: TelegramOptionsInterface;

  constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: TelegramOptionsInterface) {
    this.bot = new Telegraf(options.token);
    this.options = options;
  }

  async sendMessage(message: string, chatId: string = this.options.chatId) {
    await this.bot.telegram.sendMessage(chatId, message);
  }
}
