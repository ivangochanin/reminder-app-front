import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Accordion from '../../components/common/ui/Accordion';
import { color } from '../../configs/utilities'

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
				<h1>{slug}</h1>
				{subCategories.map((item, index) =>
					item.reminders.length ? <Accordion key={index} item={item} /> : null
				)}
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
	max-width: 1440px;
	margin: 0 auto;
	display: flex;
`;

const SidebarWrapper = styled.div`
	width: 300px;
	display: flex;
	flex-direction: column;
	row-gap: 20px;
	padding-top: 50px;
	text-align: center;
	h1 {
		text-transform: capitalize;
	}

	a {
		color: ${color.black};

	}
	.active {
		color: ${color.yellow};
	}
`;
const ReminderWrapper = styled.div`
	width: calc(100% - 300px);
`;
