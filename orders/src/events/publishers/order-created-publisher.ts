import { OrderCreatedEvent, Publisher, Subjects } from '@rstickets70/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
