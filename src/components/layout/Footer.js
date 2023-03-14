import React from 'react';
import styled from 'styled-components';
import { color } from '../../configs/utilities';

const Footer = () => {
	return (
		<Wrapper>
			<Content>©Lorem 2022, All Rights Reserved</Content>
		</Wrapper>
	);
};

export default Footer;

const Wrapper = styled.div`
	width: 100%;
	background: ${color.silver};
	color: ${color.black};
`;

const Content = styled.div`
	min-height: 5vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 14px;
	font-weight: 300;
`;
