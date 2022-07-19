import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './events.entity';

@Injectable()
export class EventsService {
	constructor(
		@InjectRepository(Events)
		private readonly eventsRepository: Repository<Events>
	) {}

	findAll() {
		return this.eventsRepository.find();
	}

	findOne(id: string) {
		return this.eventsRepository.findOne({
			where: { id }
		});
	}

	findByReceiver(receiverId: string) {
		return this.eventsRepository
			.createQueryBuilder('events')
			.where('events.care_recipient_id = :receiverId', { receiverId })
			.orderBy('events.timestamp', 'DESC')
			.getMany();
	}

	getEventsDatesByReceiverId = async (receiverId: string) => {
		const query = await this.eventsRepository
			.createQueryBuilder('events')
			.select('DISTINCT(DATE(events.timestamp)) as date')
			.where('events.care_recipient_id = :receiverId', { receiverId })
			.orderBy('events.timestamp', 'ASC')
			.getRawMany();

		const dates = query.map((date) => date.date);

		return {
			firstDate: dates[0],
			lastDate: dates[dates.length - 1]
		};
	};

	findByReceiverAndTimestamp(receiverId: string, timestamp: string) {
		const start = `${timestamp}T00:00:00.000Z`;
		const end = `${timestamp}T23:59:59.999Z`;

		return this.eventsRepository
			.createQueryBuilder('events')
			.where('events.care_recipient_id = :receiverId', { receiverId })
			.andWhere('events.timestamp BETWEEN :start AND :end', { start, end })
			.orderBy('events.timestamp', 'DESC')
			.getMany();
	}
}
