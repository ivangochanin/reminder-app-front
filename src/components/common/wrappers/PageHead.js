import React from 'react';
import styled from 'styled-components';
import { PageTitle } from '../typography/Typography';
import ButtonLink from '../buttons/ButtonLink';

const PageHead = (props) => {
	return (
		<Wrapper>
			<PageTitle>{props.title}</PageTitle>
			<ButtonLink to={props.to} buttonText={props.buttonText} />
		</Wrapper>
	);
};

export default PageHead;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 50px;
`;
