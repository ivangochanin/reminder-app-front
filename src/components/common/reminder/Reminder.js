import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import highlight from 'highlight.js';
import { color } from '../../../configs/utilities';

const Reminder = () => {
	const url = process.env.REACT_APP_API_URL;
	const { reminderSlug } = useParams();
	const [reminder, setReminder] = useState([]);

	const ref = useRef(null);

	useEffect(() => {
		ref.current.querySelectorAll('pre').forEach((el) => {
			el.classList.add(`language-${reminder.language}`);
			highlight.highlightElement(el);
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
		<Wrapper
			ref={ref}
			dangerouslySetInnerHTML={{ __html: reminder.content }}
		></Wrapper>
	);
};

export default Reminder;

const Wrapper = styled.div`
	padding: 0 0 50px 50px;
	color: ${color.black};
	h1 {
		font-size: 40px;
		font-weight: 400;
	}
	pre {
		margin: 5px 0 20px;
	}

	blockquote {
		background: ${color.yellowLight};
		padding: 10px;
		border-left: 10px solid ${color.yellow};
	}

	img {
		margin: 20px auto;
		display: flex;
	}

	a {
		color: blue;
	}

	p {
		line-height: 25px;
	}

	ul {
		padding: 20px 0 20px 40px;
	}
`;
