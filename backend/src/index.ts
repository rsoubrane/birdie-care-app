import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const port = process.env.PORT || 8000;

async function bootstrap() {
	try {
		const app = await NestFactory.create(AppModule);
		await app.setGlobalPrefix('api');
		await app.enableCors({
			methods: ['GET'],
			origin: ['https://birdie-care-app.vercel.app']
		});
		await app.listen(port);

		console.log(`Server running on port ${port}`);
	} catch (err) {
		console.error(err);
	}
}
bootstrap();
