import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Events {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	event_type: string;

	@Column()
	care_recipient_id: string;

	@Column()
	caregiver_id: string;

	@Column()
	payload: string;

	@Column()
	payload_as_text: string;

	@Column()
	rejected_event_id: string;

	@Column()
	observation_event_id: string;

	@Column()
	visit_id: string;

	@Column()
	alert_id: string;

	@Column()
	task_instance_id: string;

	@Column({ type: 'timestamp' })
	timestamp: Date;
}
