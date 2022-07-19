import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../app.module';
import { AppService } from '../app.service';
import { AppController } from '../app.controller';

describe('AppController', () => {
	let app: INestApplication;
	let appController: AppController;

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			imports: [AppModule],
			controllers: [AppController],
			providers: [AppService]
		}).compile();

		appController = module.get<AppController>(AppController);

		app = module.createNestApplication();
		await app.init();
	});

	it('should be defined', () => {
		expect(appController).toBeDefined();
	});

	it('should return server message', () => {
		expect(appController.getServerMessage()).toBe('Thank you for spending some time on this test. All the best 🙌');
	});

	afterAll(async () => {
		await app.close();
	});
});
