import styled from 'styled-components';
import { breakpoint } from '../../../configs/utilities';

export const LayoutWrapper = styled.div`
	min-height: 90vh;
	/* display: none;
	
	@media screen and (min-width: ${breakpoint.xl}) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 4096px;  // iMac 21' 4k
		margin: 0 auto;
	} */
`;

export const ViewWrapper = styled.div`
	/* height: calc(100% - 50px);
	overflow-x: auto;
	padding: 10vh 50px 50px; */
`;
