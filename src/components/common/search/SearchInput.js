import React from 'react';
import styled from 'styled-components';
import { color } from '../../../configs/utilities';

const SearchInput = ({ onSearch, isLoading, enterInput, handleKeyDown }) => {
	return (
		<Wrapper>
			<input
				placeholder="Search"
				onChange={(e) => onSearch(e.target.value)}
				onFocus={enterInput}
				onKeyDown={(e) => handleKeyDown(e)}
			/>
			{isLoading && (
				<span
					className="position-absolute  m-1"
					style={{ right: 5, zIndex: 10000 }}
				>
					<div className="spinner-border spinner-border-small" role="status" />
				</span>
			)}
		</Wrapper>
	);
};

export default SearchInput;

const Wrapper = styled.div`
	input {
		font-family: 'Roboto Mono', monospace;
		border: 1px solid ${color.blackBorder};
		outline: none;
		min-width: 400px;
		border-top-right-radius: 4px;
		border-top-left-radius: 4px;
		padding: 10px 10px;
		font-size: 16px;
		background: ${color.blackDark};
		color: ${color.white};
		::placeholder {
			color: ${color.gray};
			opacity: 1;
		}
	}
`;
