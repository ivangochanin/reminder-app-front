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
	width: 300px;
	display: flex;
	flex-direction: column;
	row-gap: 20px;
	padding-top: 50px;
	text-align: center;
	
	h1 {
		text-transform: capitalize;
		color: ${color.gray};
	}

	a {
		color: ${color.black};
	}

	.active {
		color: ${color.yellow};
	}
`;
