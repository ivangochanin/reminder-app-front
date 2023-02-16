import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { color } from '../../../configs/utilities';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
/* import { FaSearch } from 'react-icons/fa' */
import { NavLink } from 'react-router-dom';

const Search = () => {
	const url = process.env.REACT_APP_API_URL;

    const sleep = (delay = 0) => {
		return new Promise((resolve) => {
			setTimeout(resolve, delay);
		});
	}

    const [reminders, setReminders] = useState([]);

	const getReminders = async () => {
		try {
			const response = await axios.get(`${url}/search?keyphrase=ButtonLink`);
			setReminders(response.data);
            console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getReminders();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [open, setOpen] = useState(false);
	/* const [options, setOptions] = useState([]); */
	const loading = open && reminders.length === 0;

	useEffect(() => {
		let active = true;
	
		if (!loading) {
		  return undefined;
		}
	
		(async () => {
		  await sleep(1e3); // For demo purposes.
	
		  if (active) {
			setReminders([...reminders]);
		  }
		})();
	
		return () => {
		  active = false;
		};
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	  }, [loading]);
	
	  React.useEffect(() => {
		if (!open) {
            setReminders([]);
		}
	  }, [open]);
  return (
    <Wrapper>
         <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 400, input: { color: 'red' }}}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      /* getOptionLabel={(option, index) => {<NavLink key={index} to={`${option.subcategory.category.slug}/${option.slug}`} > {option.name} </NavLink>}} */
      getOptionLabel={(option) => option.name}
	  onInputChange={(e, value) => { 
		console.log('e', e);
		console.log('value', value);
	  }}
      options={reminders}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
        /*   label="Asynchronous" */
		  variant="filled"
		  color="success" 
          InputProps={{
            ...params.InputProps,
			startAdornment: (
				<InputAdornment position="start">
				  {/* <FaSearch /> */}
				</InputAdornment>
			  ),
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
    </Wrapper>
  )
}

export default Search

const Wrapper = styled.div`
	/* background: ${color.black};
	color: ${color.white}; */
`;