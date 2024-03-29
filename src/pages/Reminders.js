import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/layout/sidebar/Sidebar';

const Reminders = () => {
	const url = process.env.REACT_APP_API_URL;
	const { slug } = useParams();
	const [subCategories, setSubCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	const getSubCategories = async () => {
		setLoading(true)
		try {
			const response = await axios.get(
				`${url}/subcategories/subcategories-by-category/${slug}`
				);
				setLoading(false)
			setSubCategories(response.data.allSubCategories);
		} catch (error) {
			setLoading(false)
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
				<Sidebar slug={slug} subCategories={subCategories} loading={loading}/>
			</SidebarWrapper>
			<ReminderWrapper>
				<Outlet />
			</ReminderWrapper>
		</ViewWrapper>
	);
};

export default Reminders;

const ViewWrapper = styled.div`
	width: 100%;
	max-width: 1280px;
	min-height: 91vh;
	margin: 0 auto;
	display: flex;
	padding-top: 50px;
`;

const SidebarWrapper = styled.div`
	width: 250px;
`;

const ReminderWrapper = styled.div`
	width: calc(100% - 250px);
`;
