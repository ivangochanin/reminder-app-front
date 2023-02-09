import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
	const url = process.env.REACT_APP_API_URL;
	const { slug } = useParams();
	const [subCategories, setSubCategories] = useState([]);

	const getSubCategories = async () => {
		try {
			const response = await axios.get(
				`${url}/subcategories/subcategories-by-category/${slug}`
			);
			setSubCategories(response.data.allSubCategories);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getSubCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [slug]);

	return (
		<ViewWrapper>
			<SidebarWrapper>
				<p>{slug}</p>
				{subCategories.map((item, index) => (
					<div key={index}>
						<span>{item.name}</span>
						{item.reminders.map((item, index) => (
							<NavLink to={`${item.slug}`} key={index}>
								{item.name}
							</NavLink>
						))}
					</div>
				))}
			</SidebarWrapper>

			<ReminderWrapper>
				<Outlet />
			</ReminderWrapper>
		</ViewWrapper>
	);
};

export default Categories;

const ViewWrapper = styled.div`
	width: 90%;
	max-width: 1536px;
	margin: 0 auto;
	display: flex;
`;

const SidebarWrapper = styled.div`
	width: 300px;
	display: flex;
	flex-direction: column;
`;
const ReminderWrapper = styled.div`
	width: calc(100% - 300px);
`;
