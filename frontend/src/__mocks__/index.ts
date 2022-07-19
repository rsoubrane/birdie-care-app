export const mockedEvents = [
	{
		id: '00114a9f-00dc',
		event_type: 'fluid_intake_observation',
		caregiver_id: '220d9432-b5ed',
		timestamp: '2019-04-26T07:08:21.758Z',
		care_recipient_id: 'df50cac5-293',
		payload: '{}',
		payload_as_text:
			'{"fluid": "caffeinated", "observed": false, "timestamp": "2019-04-26T07:08:21.758Z", "event_type": "fluid_intake_observation", "consumed_volume_ml": 230}'
	},
	{
		id: '006139b8-a387',
		event_type: 'task_completed',
		caregiver_id: '5c9090ab-7d5e',
		timestamp: '2019-05-12T07:23:12.789Z',
		care_recipient_id: 'df50cac5-293',
		payload: '{}',
		payload_as_text:
			'{"timestamp": "2019-05-12T07:23:12.789Z", "event_type": "task_completed", "task_schedule_note": "Please assist me to brush my teeth", "task_definition_description": "Assist with oral hygiene"}'
	},
	{
		id: '0099ecb2-07bb',
		event_type: 'task_completed',
		caregiver_id: '5c9090ab-7d5e',
		timestamp: '2019-05-03T07:24:10.276Z',
		care_recipient_id: 'df50cac5-293',
		payload: '{}',
		payload_as_text:
			'{"timestamp": "2019-05-03T07:24:10.276Z", "event_type": "task_completed", "task_schedule_note": "Empty the bins if required.", "task_definition_description": "Ensure home is clean and tidy"}'
	},
	{
		id: '16134509-6e56',
		event_type: 'alert_raised',
		caregiver_id: 'f8651589-8e43',
		timestamp: '2019-05-07T14:58:44.923Z',
		payload: '{}',
		care_recipient_id: 'df50cac5-293c',
		payload_as_text:
			'{"timestamp": "2019-05-07T14:58:44.923Z", "event_type": "alert_raised", "observation_event_id": "11af9dd1-d068-480e-9969-0ea6f9bfa82f"}'
	},
	{
		id: 'f2f9f1cd-b7c7',
		event_type: 'food_intake_observation',
		care_recipient_id: 'df50cac5-293c',
		caregiver_id: '220d9432-b5ed',
		timestamp: '2019-04-26T12:09:45+01:00',
		payload: '{}',
		payload_as_text:
			'{"meal": "meal", "note": "Salmon sandwich, cheese and crackers and a triffle and 2x cookies.", "timestamp": "2019-04-26T12:09:45+01:00", "event_type": "food_intake_observation"}'
	},
	{
		id: '1660ad19-2be7',
		event_type: 'mood_observation',
		care_recipient_id: 'df50cac5-293c-490d-a06c-ee26796f850d',
		caregiver_id: '63f3eb22-80ed-4b04-b7e0-35fee66bf30a',
		timestamp: '2019-04-26T16:12:25+01:00',
		payload: '{}',
		payload_as_text:
			'{"id": "1660ad19-2be7", "mood": "happy",  "timestamp": "2019-04-26T16:12:25+01:00", "event_type": "mood_observation"}'
	}
];

export const mockedAlertList = [
	{
		id: '1',
		title: 'No medication observation received',
		description: "Didn't receive any medication observations in the last 24 hours",
		icon: 'mdi:alert-octagon',
		timestamp: new Date()
	},
	{
		id: '2',
		title: 'No medication observation',
		description: 'SCHEDULED',
		icon: 'mdi:alert-octagon',
		timestamp: new Date()
	}
];

export const mockedObservationList = [
	{
		label: 'Fluid intake observation',
		value: 25
	},
	{
		label: 'Incontinence pad observation',
		value: 11
	},
	{
		label: 'General observation',
		value: 10
	}
];

export const mockedEventsColors = {
	task_completed: 'success',
	mood_observation: 'warning',
	general_observation: 'info',
	physical_health_observation: 'error'
};
