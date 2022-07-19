//@ts-nocheck
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../../app/app.module';
import { EventsModule } from '../events.module';
import { EventsService } from '../events.service';
import { EventsController } from '../events.controller';
import { events } from './events';

describe('EventsController', () => {
	let app: INestApplication;
	let eventsController: EventsController;
	let eventsService: EventsService;

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			imports: [AppModule, EventsModule],
			controllers: [EventsController],
			providers: [EventsService]
		}).compile();

		eventsService = module.get<EventsService>(EventsService);
		eventsController = module.get<EventsController>(EventsController);

		app = module.createNestApplication();
		await app.init();
	});

	it('should be defined', () => {
		expect(eventsController).toBeDefined();
	});

	it('should return all events', async () => {
		const result = events;
		await jest.spyOn(eventsService, 'findAll').mockImplementation(() => result);

		expect(await eventsController.findAll()).toBe(result);
	});

	it('should return one event by id', async () => {
		const result = await events.find((event) => event.id === '1');
		jest.spyOn(eventsService, 'findOne').mockImplementation((eventId: string) => result);
	});

	it('should return events by receiver', async () => {
		const result = events.filter((event) => event.receiverId === '2');
		await jest.spyOn(eventsService, 'findByReceiver').mockImplementation(() => result);
	});

	it('should return events dates by receiver', async () => {
		const result = events.filter((event) => event.receiverId === '2');
		await jest.spyOn(eventsService, 'getEventsDatesByReceiverId').mockImplementation(() => result);
	});

	it('should return events by receiver and timestamp', async () => {
		const result = events.filter((event) => event.receiverId === '2' && event.timestamp === '2020-01-02');
		await jest.spyOn(eventsService, 'findByReceiverAndTimestamp').mockImplementation(() => result);
	});

	afterAll(async () => {
		await app.close();
	});
});
