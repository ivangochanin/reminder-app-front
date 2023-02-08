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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const SubCategoryEdit = () => {
	const url = process.env.REACT_APP_API_URL;
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [formData, setFormData] = useState({
		name: '',
		category: '',
		slug: '',
		order: '',
	});
	const [categories, setCategories] = useState([]);

	const navigate = useNavigate();
	const { id } = useParams();

	const getCategories = async () => {
		try {
			setLoading(true);
			const response = await axios.get(`${url}/admin/categories`);
			setCategories(response.data.allCategories);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const getSubCategory = async () => {
		try {
			const response = await axios.get(`${url}/admin/subcategories/${id}`);
			setFormData(response.data.getSingleSubCategory);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCategories();
		getSubCategory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const editSubCategory = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			await axios.patch(`${url}/admin/subcategories/${formData._id}`, formData);
			navigate('/subcategories');
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
				title="Edit SubCategory"
				to="/subcategories"
				buttonText="SEE ALL SUBCATEGORIES"
			/>
			<Form onSubmit={(e) => editSubCategory(e)}>
				<InputWrapper>
					<FormControl fullWidth>
						<InputLabel variant="standard" htmlFor="uncontrolled-native">
							CATEGORY
						</InputLabel>
						<NativeSelect
							disabled={loading}
							value={formData.category || ''}
							inputProps={{
								name: 'category',
								type: 'text',
								size: 'medium',
								color: 'info',
								id: 'uncontrolled-native',
							}}
							onChange={(e) => handleData(e)}
						>
							{categories.map((category) => {
								return (
									<option key={category._id} value={category._id}>
										{category.name}
									</option>
								);
							})}
						</NativeSelect>
					</FormControl>

					<TextField
						name="name"
						type="text"
						size="medium"
						color="info"
						disabled={loading}
						required
						label="NAME"
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
						label="SLUG"
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
						label="ORDER"
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
						Edit SubCategory
					</Button>
				</ButtonWrapper>
				<MessageBox>
					<MessageError>{errorMessage ? errorMessage : ''}</MessageError>
				</MessageBox>
			</Form>
		</ViewWrapper>
	);
};

export default SubCategoryEdit;

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
