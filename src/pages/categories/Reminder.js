import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Highlight from 'react-highlight';

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

	return (
		<Wrapper>
			{/* <Highlight innerHTML={true} language="javascript">
				{reminder.content}
			</Highlight> */}
			<div dangerouslySetInnerHTML={{ __html: reminder.content }}></div>
			<Highlight language="javascript">{reminder.content}</Highlight>
		</Wrapper>
	);
};

export default Reminder;

const Wrapper = styled.div`
	padding: 50px;
`;
