import styled from 'styled-components';
import { breakpoint } from '../../../configs/utilities';

export const LayoutWrapper = styled.div`
	display: none;
	
	@media screen and (min-width: ${breakpoint.xl}) {
		display: block;
		max-width: 4096px;  // iMac 21' 4k
		margin: 0 auto;
	}
`;

export const ViewWrapper = styled.div`
	height: 95vh;
	overflow-x: auto;
	padding: 10vh 50px 50px;
`;
