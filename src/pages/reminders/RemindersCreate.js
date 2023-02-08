import React, { useState, useEffect } from 'react';
import { ViewWrapper } from '../../components/common/wrappers/Wrappers';
import PageHead from '../../components/common/wrappers/PageHead';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { color } from '../../configs/utilities';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {quillModules} from "../../configs/quill";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RemindersCreate = () => {
	const url = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [formData, setFormData] = useState({
		name: '',
		subcategory: '',
		slug: '',
		order: '',
		content: '',
		reminders: []
	});
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);

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

	const getSubCategories = async (categoryId) => {
		try {
			setLoading(true);
			const response = await axios.get(`${url}/admin/subcategories/subcategories-by-category/${categoryId}`);
			setSubCategories(response.data.allSubCategories);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getCategories();
		// getSubCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleData = (e) => {
		const newData = { ...formData };
		newData[e.target.name] = e.target.value;
		setFormData(newData);
	};

	const handleContent = (value) => {
		const newData = { ...formData };
		newData.content = value
		setFormData(newData)
	}

	const handleCategories = async (e) => {
		await getSubCategories(e.target.value)
		handleData(e)
	}

	const createReminder = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			await axios.post(`${url}/admin/reminders`, formData);
			navigate('/reminders');
		} catch (error) {
			setLoading(false);
			setErrorMessage(error.response.data.msg.message);
		}
	};
	return (
		<ViewWrapper>
			<PageHead
				title="Create Reminder"
				to="/reminders"
				buttonText="SEE ALL REMINDERS"
			/>
			<Form onSubmit={(e) => createReminder(e)}>
				<InputWrapper>
				<FormControl fullWidth variant="standard">
						<InputLabel id="uncontrolled-native">
							CATEGORY
						</InputLabel>
						<Select
							inputProps={{
								name: 'category',
								type: 'text',
								size: 'medium',
								color: 'info',
								id: 'uncontrolled-native',
							}}
							value={formData.category || ''}
							onChange={(e) => handleCategories(e)}
							label="SUBCATEGORY"
						>
							{categories.map((category) => {
								return (
									<MenuItem key={category._id} value={category._id}>
										{category.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<FormControl fullWidth variant="standard">
						<InputLabel id="uncontrolled-native">
							SUBCATEGORY
						</InputLabel>
						<Select
							inputProps={{
								name: 'subcategory',
								type: 'text',
								size: 'medium',
								color: 'info',
								id: 'uncontrolled-native',
							}}
							value={formData.subcategory || ''}
							onChange={(e) => handleData(e)}
							label="SUBCATEGORY"
						>
							{subCategories.map((subCategory) => {
								return (
									<MenuItem key={subCategory._id} value={subCategory._id}>
										{subCategory.name}
									</MenuItem>
								);
							})}
						</Select>
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
				<div >
					<ReactQuill
						style={{width: '800px'}}
						theme="snow"
						value={formData.content}
						onChange={(value) => handleContent(value)}
						modules={quillModules}/>
				</div>
				<ButtonWrapper>
					<Button
						variant="contained"
						type="submit"
						color="primary"
						size="large"
						disabled={loading}
					>
						Create Reminder
					</Button>
				</ButtonWrapper>
				<MessageBox>
					<MessageError>{errorMessage ? errorMessage : ''}</MessageError>
				</MessageBox>
			</Form>
		</ViewWrapper>
	);
};

export default RemindersCreate;

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
