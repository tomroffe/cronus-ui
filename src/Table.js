import React, { Component } from 'react'

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


export default class Table extends Component {
    constructor() {
        super();
        this.state = {
          data: []
        };
    }

    render() {
        const { data } = this.state;
        return (
            <ReactTable
            data={data}
            columns={[
                {
                Header: "Name",
                columns: [
                    {
                    Header: "First Name",
                    accessor: "firstName"
                    },
                    {
                    Header: "Last Name",
                    id: "lastName",
                    accessor: d => d.lastName
                    }
                ]
                },
                {
                Header: "Info",
                columns: [
                    {
                    Header: "Age",
                    accessor: "age"
                    },
                    {
                    Header: "Status",
                    accessor: "status"
                    }
                ]
                },
                {
                Header: 'Stats',
                columns: [
                    {
                    Header: "Visits",
                    accessor: "visits"
                    }
                ]
                }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
            />
        );
    }
}

