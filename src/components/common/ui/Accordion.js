import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Collapsible from 'react-collapsible';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Accordion = (props) => {
	const { reminderSlug } = useParams();
	const [isCollapsable, setIsCollapsable] = useState(false);

	const currentItems = props.item.reminders.map(item => {
		return item.slug;
	});
	let testTrigger = currentItems.includes(reminderSlug);

	useEffect(() => {
		setIsCollapsable(testTrigger);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Wrapper>
			<Collapsible
				key={props.index}
				trigger={<Trigger>{props.item.name}</Trigger>}
				transitionTime={100}
				open={!!isCollapsable} // === isCollapsable ? true : false
			>
				<AllLinks>
					{props.item.reminders.map((item, index) => (
						<NavLink to={`${item.slug}`} key={index}>
							{item.name}
						</NavLink>
					))}
				</AllLinks>
			</Collapsible>
		</Wrapper>
	);
};

export default Accordion;

const Wrapper = styled.div``;

const Trigger = styled.span`
	font-size: 24px;
	font-weight: 600;
	cursor: pointer;
`;

const AllLinks = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 10px;
	margin: 10px 0 20px;
	text-transform: lowercase;
`;
