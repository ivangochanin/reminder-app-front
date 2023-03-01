import React from 'react';
import styled from 'styled-components';
import Accordion from '../../common/accordion/Accordion';
import { color } from '../../../configs/utilities';

const Sidebar = (props) => {
	return (
		<Wrapper>
			<h1>{props.slug}</h1>
			{props.subCategories.map((item, index) =>
				item.reminders.length ? <Accordion key={index} item={item} /> : null
			)}
		</Wrapper>
	);
};

export default Sidebar;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 20px;

	text-align: center;

	h1 {
		text-transform: capitalize;
		color: ${color.gray};
	}

	a {
		font-family: 'Roboto Mono', monospace;
		color: ${color.black};
		font-size: 14px;
	}

	.active {
		color: ${color.yellow};
	}
`;
