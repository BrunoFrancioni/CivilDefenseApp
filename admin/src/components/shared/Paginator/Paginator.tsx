import React from 'react';
import { Pagination } from 'react-bootstrap';

import { PaginatorProps, PaginatorState } from './types';

import './styles.css';

class Paginator extends React.Component<PaginatorProps, PaginatorState, {}> {
    state: PaginatorState = {
        items: []
    }

    componentDidMount() {
        this.generatePages();
    }

    generatePages = () => {
        let items = [];

        let totalPages: number;

        if (this.props.totalResults <= this.props.sizePage) {
            totalPages = 1;
        } else if (this.props.totalResults % this.props.sizePage == 0) {
            totalPages = this.props.totalResults / this.props.sizePage;
            items.push(<Pagination.First />);
        } else {
            totalPages = (this.props.totalResults / this.props.sizePage) + 1;
            items.push(<Pagination.First />);
        }

        for (let i = 1; i <= totalPages; i++) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={this.props.active == i}
                    onClick={() => this.changePage(i)}
                    className="hover-item"
                >{i}</Pagination.Item>
            );
        }

        if (this.props.totalResults >= this.props.sizePage) {
            if (this.props.totalResults % this.props.sizePage == 0) {
                items.push(<Pagination.Last />);
            } else {
                items.push(<Pagination.Last />);
            }
        }

        this.setState({
            items: items
        });
    }

    changePage = (number: number) => {
        this.props.changePage(number);
    }

    render() {
        return (
            <Pagination>
                {this.state.items}
            </Pagination>
        )
    };
}

export default Paginator;