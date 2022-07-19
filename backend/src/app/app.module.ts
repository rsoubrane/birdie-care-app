import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// app
import { AppController } from './app.controller';
import { AppService } from './app.service';
// events
import { EventsModule } from '../events/events.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.DB_HOST,
			port: 3306,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: false,
			retryAttempts: 3,
			retryDelay: 1000,
			autoLoadEntities: true
		}),
		EventsModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
