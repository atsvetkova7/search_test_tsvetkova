import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import Input from "./Input";

const Search = ({ handleFetching, handleChange, value }) => {
  return (
    <div className="search">
      <form method="GET" className="row" onSubmit={handleFetching}>
        <Input
          placeholder="What would you like to find?"
          onChange={handleChange}
          value={value}
        />
        <Button>Search</Button>
      </form>
    </div>
  );
};

Search.propTypes = {
  handleFetching: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default Search;
