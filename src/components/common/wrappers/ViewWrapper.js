import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { showContainer } from '../../../configs/animations';
import { breakpoint } from '../../../configs/utilities';

const ViewWrapper = ({ children }) => {
	const [playAnimation, setPlayAnimation] = useState(false);
	const containerContent = useRef(null);

	useEffect(() => {
		const onPageLoad = () => {
			setPlayAnimation(true);
		};

		if (document.readyState === 'complete') {
			onPageLoad();
		} else {
			window.addEventListener('load', onPageLoad);
			return () => window.removeEventListener('load', onPageLoad);
		}
		if (playAnimation) {
			showContainer(containerContent);
		}
	}, [playAnimation]);

	return (
		<Wrapper ref={containerContent}>
			<Children>{children}</Children>
			<Mobile>For Desktop Only</Mobile>
		</Wrapper>
	);
};

export default ViewWrapper;

const Wrapper = styled.div`
	visibility: hidden;
	width: 100%;
	min-height: 91vh;
	overflow-x: auto;
	padding: 10vh 50px 50px;
	margin: 0 auto;
`;

const Children = styled.div`
	display: none;
	@media screen and (min-width: ${breakpoint.lg}) {
		display: block;
	}
`;

const Mobile = styled.div`
	display: block;
	font-size: 40px;
	@media screen and (min-width: ${breakpoint.lg}) {
		display: none;
	}
`;
