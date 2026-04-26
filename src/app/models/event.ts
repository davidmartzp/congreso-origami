export type EventType = 'workshop' | 'activity';

export interface Event {
  type: EventType;
  name: string;
  day: 'Saturday' | 'Sunday';
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
  room?: string;
  rooms?: string[];
  extraData?: {
    speaker?: string;
    capacity?: number;
    description?: string;
  };
}