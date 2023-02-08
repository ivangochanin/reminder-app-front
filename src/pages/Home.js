import React from 'react';
import styled from 'styled-components';
import { breakpoint, color } from '../configs/utilities';
import { ViewWrapper } from '../components/common/wrappers/Wrappers';
import PageHead from '../components/common/wrappers/PageHead';

const Home = () => {
	return (
		<PageWrapper>
			<ViewWrapper>
				<Wrapper>
					<PageHead
						title="Dashboard with:"
						to="/reminders"
						buttonText="SEE ALL REMINDERS"
					/>
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
		</PageWrapper>
	);
};

export default Home;

const PageWrapper = styled.div`
	@media screen and (min-width: ${breakpoint.xl}) {
		background: ${color.white};
	}
`;

const Wrapper = styled.div`
	ul {
		margin: 50px;
	}
`;
