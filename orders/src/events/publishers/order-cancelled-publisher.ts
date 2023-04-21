import { OrderCancelledEvent, Publisher, Subjects } from '@rstickets70/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
