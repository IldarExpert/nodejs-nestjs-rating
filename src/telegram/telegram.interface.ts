import { ModuleMetadata } from '@nestjs/common';

export interface TelegramOptionsInterface {
  chatId: string;
  token: string;
}

export interface ITelegramModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<TelegramOptionsInterface> | TelegramOptionsInterface;
  inject: any[];
}
