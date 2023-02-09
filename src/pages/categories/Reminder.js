import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Reminder = () => {
	const url = process.env.REACT_APP_API_URL;
	const { reminderSlug } = useParams();
	const [reminder, setReminder] = useState([]);

	const getReminders = async () => {
		try {
			const response = await axios.get(`${url}/reminders/${reminderSlug}`);
			setReminder(response.data.getSingleReminder);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getReminders();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reminderSlug]);

console.log(reminder);

	return (
		<div>
			<p>{reminder.name}</p>
            <div dangerouslySetInnerHTML={{__html: reminder.content}}></div>
		</div>
	);
};

export default Reminder;
