import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap';

class Sale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sale: {},
            loading: true
        };
    }

    getData (){
        return new Promise((resolve, reject) => {
            fetch(`https://safe-sierra-41779.herokuapp.com/api/sales/${this.props.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.message._id) {
                    this.props.viewedSale(data.message._id);
                    this.setState({ sale: data.message, loading: false });
                } else {
                    this.setState({ sale: false, loading: false });
                }
            });
        });
    };

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.setState({ loading: true });
            this.getData();
        }
    }

    itemTotal(items) {
        return items.reduce(
            (accumulator, currentValue) =>
                currentValue.price * currentValue.quantity + accumulator,
            0
        );
    }

    render() {
        if (this.state.loading) {
            return null; // NOTE: This can be changed to render a <Loading /> Component for a better user experience
        } else {
            if (this.state.sale._id) {
                return (<div>
                    <h1>Sale: {this.state.sale._id}</h1>
                    <h2>Customer</h2>
                    <ListGroup>
                        <ListGroupItem><strong>email:</strong> {this.state.sale.customer.email} </ListGroupItem>
                        <ListGroupItem><strong>age:</strong> {this.state.sale.customer.age} </ListGroupItem>
                        <ListGroupItem><strong>satisfaction:</strong> {this.state.sale.customer.satisfaction} / 5 </ListGroupItem>
                    </ListGroup>
                    <h2> Items: {this.itemTotal(this.state.sale.items).toFixed(2)} </h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.sale.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>);
            } else {
                return <div><h1>Unable to find Sale</h1><p>id: {this.props.id}</p></div>
            }
        }
    }
}

export default Sale;