import React from 'react';
import styled from 'styled-components';
import Collapsible from 'react-collapsible';
import { NavLink } from 'react-router-dom';

const Accordion = (props) => {
	return (
		<Wrapper>
			<Collapsible
				key={props.index}
				trigger={<Trigger>{props.item.name}</Trigger>}
				transitionTime={100}
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
	font-size: 20px;
	cursor: pointer;
`;

const AllLinks = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 10px;
	margin: 10px 0 20px;
	text-transform: lowercase;
`;
