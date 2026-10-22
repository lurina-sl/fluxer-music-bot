export type EventBusMessage = {
  type: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  timestamp: string;
};

export class EventBus {
  private readonly listeners: Array<(event: EventBusMessage) => void> = [];

  subscribe(listener: (event: EventBusMessage) => void): void {
    this.listeners.push(listener);
  }

  publish(event: EventBusMessage): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}
