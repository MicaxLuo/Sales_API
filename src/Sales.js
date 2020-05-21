import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';

class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            currentPage: 1
        };
    }

    getData (page) {
        return new Promise((resolve, reject) => {
            fetch(`https://safe-sierra-41779.herokuapp.com/api/sales?page=${page}&perPage=10`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    sales: data.message,
                    currentPage: page
                });
            });
        })
    };

    componentDidMount() {
        this.getData(this.state.currentPage);
    }

    perviousPage() {
        if (this.state.currentPage > 1) {
            this.getData(this.state.currentPage - 1);
        }
    }

    nextPage() {
        this.getData(this.state.currentPage + 1);
    }

    render() {
        if (this.state.sales.length > 0) {
            return (
                <div>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Store Location</th>
                                <th>Number of Items</th>
                                <th>Sale Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.sales.map(sale => (
                                <tr key={sale._id} onClick={() => { this.props.history.push(`/Sale/${sale._id}`); }}>
                                    <td>{sale.customer.email}</td>
                                    <td>{sale.storeLocation}</td>
                                    <td>{sale.items.length}</td>
                                    <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev onClick={this.perviousPage.bind(this)} />
                        <Pagination.Item active>{this.state.currentPage}</Pagination.Item>
                        <Pagination.Next onClick={this.nextPage.bind(this)} />
                    </Pagination>
                </div>
            );
        } else {
            return null; // NOTE: This can be changed to render a <Loading /> Component for a better user experience
        }
    }
}

export default withRouter(Sales);