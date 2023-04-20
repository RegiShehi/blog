import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../test/setup';
import { Ticket } from '../../models/ticket';

it('fetches the order', async () => {
  // Create ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 20
  });

  await ticket.save();

  const user = signin();

  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make a request to fecth the order
  const { body: fetchedOrder } = await request(app)
    .post(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it('returns an error if one user tries to fetch another users order', async () => {
  // Create ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 20
  });

  await ticket.save();

  const user = signin();

  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make a request to fecth the order
  const { body: fetchedOrder } = await request(app)
    .post(`/api/orders/${order.id}`)
    .set('Cookie', signin())
    .send()
    .expect(401);
});
