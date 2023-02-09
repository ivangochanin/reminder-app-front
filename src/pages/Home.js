import React from 'react';
import styled from 'styled-components';
import { breakpoint, color } from '../configs/utilities';
import { ViewWrapper } from '../components/common/wrappers/Wrappers';

const Home = () => {
	return (
		<HomeWrapper>
			<ViewWrapper>
				<Wrapper>
					<ul>
						<li>Data Grid Visualization</li>
						<li>Charts</li>
						<li>Popular categories</li>
						<li>Popular subcategories</li>
						<li>Popular reminders</li>
						<li>Last added</li>
					</ul>
				</Wrapper>
			</ViewWrapper>
		</HomeWrapper>
	);
};

export default Home;

const HomeWrapper = styled.div`
	width: 90%;
	max-width: 1536px;
	margin: 0 auto;
	@media screen and (min-width: ${breakpoint.xl}) {
		background: ${color.white};
	}
`;

const Wrapper = styled.div`
	ul {
		margin: 50px;
	}
`;
