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

const Reminders = () => {

	const url = process.env.REACT_APP_API_URL;
	const [reminders, setReminders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [selectedReminder, setSelectedReminder] = useState({});

	const navigate = useNavigate();

	const getReminders = async () => {
		try {
			setLoading(true);
			const response = await axios.get(`${url}/admin/reminders`);
			setReminders(response.data.allReminders);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getReminders();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const editReminder = useCallback(
		(id) => () => {
			navigate(`/reminders/${id}/edit`);
		},
		[navigate]
	);

	const openDeleteModal = useCallback(
		(reminder) => () => {
			setSelectedReminder(reminder.row)
			handleOpen();
		},
		[]
	);

	 const deleteReminder = async () => {
		try {
			await axios.delete(`${url}/admin/reminders/${selectedReminder._id}`);
			handleClose();
			getReminders();
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
				field: 'subcategory',
				headerName: 'SUBCATEGORY',
				renderCell: (params) => (
				  <strong>
					{params.row.subcategory.name}
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
						onClick={editReminder(params.id)}
					/>,
					<GridActionsCellItem
						icon={<RiDeleteBin4Line />}
						label="Delete"
						onClick={openDeleteModal(params)}
					/>,
				],
			},
		],
		[openDeleteModal, editReminder]
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
				title="Reminders"
				to="/reminders/create"
				buttonText="CREATE REMINDER"
			/>
			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					<div>Are you sure?!!?</div>
					<Button
						variant="contained"
						color="error"
						size="small"
						onClick={deleteReminder}
						>
						Delete Reminder
					</Button>
						{selectedReminder.name} REMINDER ?
				</Box>
			</Modal>
			<TableWrapper>
				<DataGrid
					sx={{ border: 0 }}
					getRowId={(row) => row._id}
					rows={reminders}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[10]}
					loading={loading}
				/>
			</TableWrapper>
		</ViewWrapper>
	);
};

export default Reminders;

const TableWrapper = styled.div`
	width: 100%;
	height: 700px; // table MUST have height prop
`;