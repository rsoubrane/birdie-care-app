import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../../app/app.module';
import { EventsModule } from '../events.module';
import { EventsService } from '../events.service';
import { events } from './events';

/**
 * Events Controller API end-to-end tests
 *
 * This test suite performs end-to-end tests on the events API endpoints,
 * allowing us to test the behavior of the API and making sure that it fits
 * the requirements.
 */
describe('EventsController (e2e)', () => {
	let app: INestApplication;
	const eventsService = {
		findAll: () => events,
		findOne: (eventId: string) => events.find((event) => event.id === eventId),
		findByReceiver: (receiverId: string) => events.filter((event) => event.receiverId === receiverId),
		getEventsDatesByReceiverId: (receiverId: string) =>
			events.filter((event) => event.receiverId === receiverId).map((event) => event.timestamp),
		findByReceiverAndTimestamp: (receiverId: string, timestamp: string) =>
			events.filter((event) => event.receiverId === receiverId && event.timestamp === timestamp)
	};

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			imports: [AppModule, EventsModule]
		})
			.overrideProvider(EventsService)
			.useValue(eventsService)
			.compile();

		app = module.createNestApplication();
		await app.init();
	});

	it('should be defined', () => {
		expect(eventsService).toBeDefined();
	});

	it('should return the list of all events', () => {
		return request(app.getHttpServer()).get('/events').send().expect(200).expect(events);
	});

	it('should return the event with the given id', () => {
		return request(app.getHttpServer()).get('/events/4').expect(200).expect(eventsService.findOne('4'));
	});

	it('should return the list of events for the given receiver', () => {
		return request(app.getHttpServer())
			.get('/events/receiver/2')
			.expect(200)
			.expect(eventsService.findByReceiver('2'));
	});

	it('should return the list of events dates for the given receiver', () => {
		return request(app.getHttpServer())
			.get('/events/dates/receiver/2')
			.expect(200)
			.expect(eventsService.getEventsDatesByReceiverId('2'));
	});

	it('should return the list of events for the given receiver and timestamp', () => {
		return request(app.getHttpServer())
			.get('/events/receiver/2/2020-01-02')
			.expect(200)
			.expect(eventsService.findByReceiverAndTimestamp('2', '2020-01-02'));
	});

	afterAll(async () => {
		await app.close();
	});
});
