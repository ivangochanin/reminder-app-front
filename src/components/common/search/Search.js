import React, { useState } from 'react';
import { debounce } from 'lodash';
import SearchField from './SearchField';
import SearchItems from './SearchItems';
import axios from 'axios';

const Search = () => {
  // https://blog.devgenius.io/asynchronous-autocomplete-search-with-react-axios-and-lodash-debounce-b59e57be5b3b
  const url = process.env.REACT_APP_API_URL;
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
  
  const searchFun = (queryParam, setResults, setIsLoading) => {
    axios.get(`${url}/search?keyphrase=${queryParam}`)
     .then(({ data }) => {
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
		}
	};
  
  const debouncedSearch = debounce(searchFun, 300);

	return (
		<>
			<SearchField onSearch={onSearch} isLoading={isLoading} />
			{!!results.length && <SearchItems items={results} onSelect={(i) => alert(i)} />}
		</>
	);
};

export default Search;
