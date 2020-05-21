import React, { Component } from 'react';

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {
          sale: {},
          loading: true
        };
    }

    getData = async () =>
        await fetch(`https://sijia-web422-a2.herokuapp.com/api/sales/${this.props.id}`)
        .then(res => res.json())
        .then(data => {
            if (data.message._id) {
            this.props.viewedSale(data.message._id);
            this.setState({
                sale: data.message,
                loading: false
            });
            } else {
            this.setState({
                sale: false,
                loading: false
            });
        }
    });


    render() {
        return (
            <div>
                <h1>Not Found</h1>
                <p>We can't find what you're looking for...</p>
            </div>
        )
    }
}

export default NotFound;