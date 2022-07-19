import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../app.module';

/**
 * App API end-to-end tests
 *
 * This test suite performs end-to-end tests that checks the App
 * API is working as expected.
 */
describe('App', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	it(`should be defined`, () => {
		expect(app).toBeDefined();
	});

	it(`should display the welcome message`, () => {
		return request(app.getHttpServer())
			.get('/')
			.expect(200)
			.expect('Thank you for spending some time on this test. All the best 🙌');
	});
});
