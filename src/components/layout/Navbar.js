import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { color } from '../../configs/utilities';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import home from '../../assets/logo.jpg';
import Search from '../common/search/Search'

const Navbar = () => {
	const url = process.env.REACT_APP_API_URL;
	const [categories, setCategories] = useState([]);

	const getCategories = async () => {
		try {
			const response = await axios.get(`${url}/categories`);
			setCategories(response.data.allCategories);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Wrapper>
			<Content>
				<NavLink to="/">
					<img src={home} alt="" />
				</NavLink>
				{categories.map((item, index) => (
					<NavLink to={item.slug} key={index}>
						<span>{item.name}</span>
					</NavLink>
				))}
				<Search/>
			</Content>
		</Wrapper>
	);
};

export default Navbar;

const Wrapper = styled.div`
	width: 100%;
	background: ${color.black};
	color: ${color.white};
`;

const Content = styled.div`
	min-height: 50px;
	width: 90%;
	max-width: 1440px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	font-size: 16px;
	font-weight: 500;

	.active {
		color: ${color.yellow};
	}
	
	a {
		color: ${color.white};
		display: flex;
		align-items: center;
		column-gap: 10px;
	}

	img {
		width: 30px;
	}
`;
