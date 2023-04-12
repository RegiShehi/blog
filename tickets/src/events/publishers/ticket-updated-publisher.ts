import { Publisher, Subjects, TicketUpdatedEvent } from '@rstickets70/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
