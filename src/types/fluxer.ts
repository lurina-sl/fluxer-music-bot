export type FluxerCommandContext = {
  guildId?: string;
  channelId?: string;
  userId?: string;
  username?: string;
  args: string[];
  reply: (message: string) => Promise<unknown> | unknown;
};

export type FluxerCommandHandler = (context: FluxerCommandContext) => Promise<void> | void;

export type FluxerCommandDefinition = {
  name: string;
  description: string;
  handler: FluxerCommandHandler;
};
