import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { breakpoint, color } from '../../configs/utilities';
import { RiHome2Line } from 'react-icons/ri';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdOutlineCategory } from 'react-icons/md';
import { BiNotepad } from 'react-icons/bi';

const Sidebar = () => {
	return (
		<Wrapper>
	
				<Content>
				<h1>ADMIN PANEL</h1>
					<NavLink to="/">
						<RiHome2Line className="icon" size={'30px'} /> 
						<span>Home</span>
					</NavLink>
					<NavLink to="/categories">
						<BiCategoryAlt className="icon" size={'30px'} /> 
						<span>Categories</span>
					</NavLink>
					<NavLink to="/subcategories">
						<MdOutlineCategory className="icon" size={'30px'} /> 
						<span>SubCategories</span>
					</NavLink>
					<NavLink to="/reminders">
						<BiNotepad className="icon" size={'30px'} /> 
						<span>Reminders</span>
					</NavLink>
				</Content>
			
		</Wrapper>
	);
};

export default Sidebar;

const Wrapper = styled.div`
	width: 100%;
	height: calc(100% - 50px);
	background: ${color.white};
    padding: 30px 30px;
  
.active {
    color: ${color.yellow};
}

  a {
    color: ${color.black};
	display: flex;
	align-items: center;
	column-gap: 10px;
	font-size: 16px;
    font-weight: 600;
    @media screen and (min-width: ${breakpoint.xxl}) {
		font-size: 18px;
    font-weight: 600;
	}
  }
`;

const Content = styled.div`
	width: 100%;
	display: flex;
    flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
    row-gap: 20px;
    
	h1{
      color: ${color.white};
	  opacity: .8;
	  font-size: 34px;
	  font-weight: 400;
	  letter-spacing: 2px;
	  margin-bottom: 50px;
	}

	@media screen and (min-width: ${breakpoint.xl}) {
	}
`;
