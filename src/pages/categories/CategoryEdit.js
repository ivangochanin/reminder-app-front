import React, { useState, useEffect } from 'react';
import { ViewWrapper } from '../../components/common/wrappers/Wrappers';
import PageHead from '../../components/common/wrappers/PageHead';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { color } from '../../configs/utilities';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const CategoryEdit = () => {

	const url = process.env.REACT_APP_API_URL;
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [formData, setFormData] = useState({
		name: '',
		slug: '',
		order: '',
	});
	
	const navigate = useNavigate();
	const { id } = useParams();

	const getCategory = async () => {
		try {
			const response = await axios.get(`${url}/admin/categories/${id}`);
			setFormData(response.data.getSingleCategory);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCategory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const editCategory = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			await axios.patch(`${url}/admin/categories/${formData._id}`, formData);
			navigate('/categories');
		} catch (error) {
			setLoading(false);
			setErrorMessage(error.response.data.msg.message);
		}
	};

	const handleData = (e) => {
		const newData = { ...formData };
		newData[e.target.name] = e.target.value;
		setFormData(newData);
	};

	return (
		<ViewWrapper>
			<PageHead
				title="Edit Category"
				to="/categories"
				buttonText="SEE ALL CATEGORIES"
			/>
			<Form onSubmit={(e) => editCategory(e)}>
				<InputWrapper>
					<TextField
						name="name"
						type="text"
						size="medium"
						color="info"
						disabled={loading}
						required
						label="Name"
						variant="standard"
						fullWidth
						value={formData.name || ''}
						onChange={(e) => handleData(e)}
					/>
					<TextField
						name="slug"
						type="text"
						size="medium"
						color="info"
						disabled={loading}
						required
						label="Slug"
						variant="standard"
						fullWidth
						value={formData.slug || ''}
						onChange={(e) => handleData(e)}
					/>
					<TextField
						name="order"
						type="number"
						size="medium"
						color="info"
						disabled={loading}
						label="Order"
						variant="standard"
						fullWidth
						value={formData.order || ''}
						onChange={(e) => handleData(e)}
					/>
				</InputWrapper>

				<ButtonWrapper>
					<Button
						variant="contained"
						type="submit"
						color="primary"
						size="large"
						disabled={loading}
					>
						Edit Category
					</Button>
				</ButtonWrapper>
				<MessageBox>
					<MessageError>{errorMessage ? errorMessage : ''}</MessageError>
				</MessageBox>
			</Form>
		</ViewWrapper>
	);
};

export default CategoryEdit;

const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 30px;
`;

const InputWrapper = styled.div`
	width: 100%;
	display: flex;
	column-gap: 40px;
`;

const MessageBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 250px;
	font-weight: 400;
	min-height: 80px;
	font-size: 16px;
	text-align: center;
`;

const MessageError = styled.span`
	color: ${color.red};
`;

const ButtonWrapper = styled.div`
	padding-top: 20px;
`;
