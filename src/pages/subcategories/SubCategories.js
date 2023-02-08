import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { ViewWrapper } from '../../components/common/wrappers/Wrappers';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import axios from 'axios';
import PageHead from '../../components/common/wrappers/PageHead';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const SubCategories = () => {
	const url = process.env.REACT_APP_API_URL;
	const [subCategories, setSubCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [selectedSubCategory, setSelectedSubCategory] = useState({});

	const navigate = useNavigate();

	const getSubCategories = async () => {
		try {
			setLoading(true);
			const response = await axios.get(`${url}/admin/subcategories`);
			setSubCategories(response.data.allSubCategories);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getSubCategories();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const editSubCategory = useCallback(
		(id) => () => {
			navigate(`/subcategories/${id}/edit`);
		},
		[navigate]
	);

	const openDeleteModal = useCallback(
		(subCategory) => () => {
			setSelectedSubCategory(subCategory.row)
			handleOpen();
		},
		[]
	);

	 const deleteSubCategory = async () => {
		try {
			await axios.delete(`${url}/admin/subcategories/${selectedSubCategory._id}`);
			handleClose();
			getSubCategories();
		} catch (error) {
			console.log(error);
		}
	 }

	const columns = useMemo(
		() => [
			
			{ field: 'name', headerName: 'NAME', 
			renderCell: (params) => (
				<strong>
				  {params.row.name}
				</strong>
			  ),
			width: 200 },
			{
				field: 'category',
				headerName: 'CATEGORY',
				renderCell: (params) => (
				  <strong>
					{params.row.category.name}
				  </strong>
				),
				width: 200
			  },
			
			{ field: 'order', headerName: 'ORDER', width: 100 },
			{ field: 'slug', headerName: 'SLUG', width: 100 },
			{ field: '_id', headerName: 'ID', width: 250 },
			{
				field: 'createdAt',
				headerName: 'CREATED AT',
				type: 'date',
				width: 200,
			},
			{
				field: 'actions',
				type: 'actions',
				headerName: 'ACTIONS',
				width: 80,
				getActions: (params) => [
					<GridActionsCellItem
						icon={<MdOutlineModeEditOutline />}
						label="Edit"
						onClick={editSubCategory(params.id)}
					/>,
					<GridActionsCellItem
						icon={<RiDeleteBin4Line />}
						label="Delete"
						onClick={openDeleteModal(params)}
					/>,
				],
			},
		],
		[openDeleteModal, editSubCategory]
	);

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};
	return (
		<ViewWrapper>
			<PageHead
				title="SubCategory"
				to="/subcategories/create"
				buttonText="CREATE SUBCATEGORY"
			/>
			
			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					<div>Are you sure?!!?</div>
					<Button
						variant="contained"
						color="error"
						size="small"
						onClick={deleteSubCategory}
						>
						Delete SubCategory
					</Button>
						{selectedSubCategory.name} SUBCATEGORY ?
				</Box>
			</Modal>
			<TableWrapper>
				<DataGrid
					sx={{ border: 0 }}
					getRowId={(row) => row._id}
					rows={subCategories}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[10]}
					loading={loading}
				/>
			</TableWrapper>
		</ViewWrapper>
	);
};

export default SubCategories;

const TableWrapper = styled.div`
	width: 100%;
	height: 700px; // table MUST have height prop
`;