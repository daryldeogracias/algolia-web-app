"use client";

import React from "react";
import Result from "./Result";
import Panel from "./Panel";

import {
  Hits,
  Pagination,
  RefinementList,
  SearchBox,
} from "react-instantsearch";

const Search = () => {
  return (
    <div className="container">
      <div className="search-panel">
        <div className="search-panel__filters">
          <Panel header="brand">
            <RefinementList attribute="brand" />
          </Panel>
        </div>
        <div className="search-panel__results">
          <SearchBox placeholder="" className="searchbox" />
          {/* <Hits hitComponent={Result} /> */}
          <div className="pagination">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
