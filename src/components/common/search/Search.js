import React, { useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import axios from 'axios';
import { useDetectClickOutside } from 'react-detect-click-outside';

const Search = () => {
	// https://blog.devgenius.io/asynchronous-autocomplete-search-with-react-axios-and-lodash-debounce-b59e57be5b3b
	const url = process.env.REACT_APP_API_URL;
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const ref = useDetectClickOutside({ onTriggered: (e) => {
		setShowResult(false)
	} });

	const searchFun = (queryParam, setResults, setIsLoading) => {
		axios.get(`${url}/search?keyphrase=${queryParam}`).then(({ data }) => {
			setIsLoading(false);
			setResults(data);
		});
	};

	const onSearch = (v) => {
		const search = debouncedSearch;
		if (!v) {
			debouncedSearch.cancel();
			setResults([]);
			setIsLoading(false);
		} else {
			setIsLoading(true);
			search(v, setResults, setIsLoading);
			setShowResult(true)
		}
	};

	const debouncedSearch = debounce(searchFun, 300);

	const onSelect = () => {
		setShowResult(false)
	};

	const enterInput = () => {
		setShowResult(true)
	}

	const handleKeyDown = (event) => {
		if (event.key === 'Escape') {
			setShowResult(false)
			event.target.blur()
		}
	};

	return (
		<Wrapper ref={ref}>
			<SearchInput
				onSearch={onSearch}
				isLoading={isLoading}
				enterInput={enterInput}
				handleKeyDown={handleKeyDown}
			/>

			<Result className={showResult ? 'show' : 'hide'}>
				<SearchResults items={results} onSelect={onSelect} />
			</Result>
		</Wrapper>
	);
};

export default Search;

const Wrapper = styled.div`
	background: green;
	position: relative;
	border-top-right-radius: 4px;
	border-top-left-radius: 4px;

	.hide {
		display: none;
	}
	.show {
		display: flex;
	}
`;

const Result = styled.div``;
