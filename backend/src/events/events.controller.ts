import { Controller, Get, Param } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
	constructor(private readonly eventsService: EventsService) {}

	@Get()
	findAll() {
		return this.eventsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.eventsService.findOne(id);
	}

	@Get('/receiver/:receiverId')
	findByReceiver(@Param('receiverId') receiverId: string) {
		return this.eventsService.findByReceiver(receiverId);
	}

	@Get('/dates/receiver/:receiverId')
	getEventsDatesByReceiverId(@Param('receiverId') receiverId: string) {
		return this.eventsService.getEventsDatesByReceiverId(receiverId);
	}

	@Get('/receiver/:receiverId/:timestamp')
	findByReceiverAndTimestamp(@Param('receiverId') receiverId: string, @Param('timestamp') timestamp: string) {
		return this.eventsService.findByReceiverAndTimestamp(receiverId, timestamp);
	}
}
