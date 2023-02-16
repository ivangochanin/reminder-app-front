import React from "react";

const SearchField = ({ onSearch, isLoading }) => {
  return (
    <div className="input-group position-relative">
      <input
        className="form-control"
        placeholder="search"
        onChange={(e) => onSearch(e.target.value)}
      />
      {isLoading && (
        <span
          className="position-absolute  m-1"
          style={{ right: 5, zIndex: 10000 }}
        >
          <div className="spinner-border spinner-border-small" role="status" />
        </span>
      )}
    </div>
  );
};

export default SearchField;