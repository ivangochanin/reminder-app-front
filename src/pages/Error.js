import React from 'react';
import { BiCommentError } from 'react-icons/bi';
import { breakpoint, color } from '../configs/utilities';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Error = () => {
	return (
		<PageWrapper>
			<Wrapper>
				<BiCommentError className="icon" size={'200px'} />
				<h1>Page Not Found !</h1>
				<Link to="/">
					<Button>Go Home</Button>
				</Link>
			</Wrapper>
		</PageWrapper>
	);
};

export default Error;

const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${color.blue};

	@media screen and (min-width: ${breakpoint.xl}) {
	}
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 100px;
	h1,
	.icon {
		color: ${color.yellow};
	}

	a {
		color: ${color.white};
	}
`;

const Button = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 50px;
	border-radius: 12px;
	background: ${color.blue};
	font-size: 24px;
	font-weight: 700;
	letter-spacing: 1px;
	margin-top: 50px;
`;
