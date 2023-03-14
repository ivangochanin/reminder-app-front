import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const AccordionCustom = (props) => {
	return (
		<Wrapper>
			<div className="accordion">
				<div className="accordion-item">
					<Trigger onClick={() => props.clickedTrigger(props.index)}>
						{props.item.name}
					</Trigger>

					{props.isCollapsable && (
						<AllLinks>
							{props.item.reminders.map((item, index) => (
								<NavLink to={`${props.item.slug}/${item.slug}`} key={index}>
									{item.name}
								</NavLink>
							))}
						</AllLinks>
					)}
				</div>
			</div>
		</Wrapper>
	);
};

export default AccordionCustom;

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
