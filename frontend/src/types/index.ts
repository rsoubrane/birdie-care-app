export type Data = {
	id: string;
	task_instance_id?: string | null;
	event_type: string;
	payload: string;
	payload_as_text: string;
	rejected_event_id?: any;
	timestamp: string;
	observation_event_id?: string | null;
	care_recipient_id: string;
	visit_id?: string | null;
	alert_id?: string | null;
	caregiver_id?: string | null;
};
