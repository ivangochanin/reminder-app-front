import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import highlight from 'highlight.js'

const Reminder = () => {
	const url = process.env.REACT_APP_API_URL;
	const { reminderSlug } = useParams();
	const [reminder, setReminder] = useState([]);

	useEffect(() => {
		document.querySelectorAll('.code').forEach((el) => {
			el.querySelectorAll('pre').forEach((el) => {
				highlight.highlightElement(el)
			})
		});
	});

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
			<div className="code" dangerouslySetInnerHTML={{ __html: reminder.content }}></div>
			{/*<Highlight language="javascript" className="code" >{reminder.content}</Highlight>*/}
		</Wrapper>
	);
};

export default Reminder;

const Wrapper = styled.div`
	padding: 50px;
`;
