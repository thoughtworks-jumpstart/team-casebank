import React, { Component } from "react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from "react-router-dom";

export default class SearchResults extends Component {
  render() {
    return (
      <div>
        <ReactTable
          data={this.props.resultList}
          style={{ overflow: "wrap" }}
          noDataText="No results"
          columns={[
            {
              columns: [
                {
                  Header: <div className="resultListingHeader">Project</div>,
                  accessor: "name",
                  Cell: row => (
                    <Link
                      to={`/results/details/${row.original._id}`}
                      target="_blank"
                    >
                      {row.original.name}
                    </Link>
                  )
                },
                {
                  Header: <div className="resultListingHeader">Client</div>,
                  accessor: "client"
                },
                {
                  Header: <div className="resultListingHeader">Region</div>,
                  accessor: "region"
                },
                {
                  Header: <div className="resultListingHeader">Year</div>,
                  accessor: "year"
                },
                {
                  Header: <div className="resultListingHeader">Industry</div>,
                  accessor: "industry"
                }
              ]
            }
          ]}
          defaultSorted={[
            {
              id: "year",
              desc: true
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}
