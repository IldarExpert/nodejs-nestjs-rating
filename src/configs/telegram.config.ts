import { ConfigService } from '@nestjs/config';
import { TelegramOptionsInterface } from '../telegram/telegram.interface';

export const getTelegramConfig = (configService: ConfigService): TelegramOptionsInterface => {
  const token = configService.get('TELEGRAM_TOKEN');
  if (!token) {
    throw new Error('TELEGRAM_TOKEN не задан');
  }
  return {
    token: token,
    chatId: configService.get('CHAT_ID') ?? '',
  };
};
