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
            items.push(<Pagination.First key={0} onClick={() => this.changePage(1)} />);
        } else {
            totalPages = Math.ceil(this.props.totalResults / this.props.sizePage);
            items.push(<Pagination.First key={0} onClick={() => this.changePage(1)} />);
        }

        if (totalPages > 5) {
            if (this.props.active === 1 || this.props.active === 2) {
                for (let i = 1; i <= 5; i++) {
                    items.push(
                        <Pagination.Item
                            key={i}
                            active={this.props.active == i}
                            onClick={() => this.changePage(i)}
                            className="hover-item"
                        >{i}</Pagination.Item>
                    );
                }
            } else if (this.props.active === totalPages ||
                this.props.active === (totalPages - 1)) {
                for (let i = totalPages - 5; i <= totalPages; i++) {
                    items.push(
                        <Pagination.Item
                            key={i}
                            active={this.props.active == i}
                            onClick={() => this.changePage(i)}
                            className="hover-item"
                        >{i}</Pagination.Item>
                    );
                }
            } else {
                for (let i = this.props.active - 2; i <= this.props.active + 2; i++) {
                    items.push(
                        <Pagination.Item
                            key={i}
                            active={this.props.active == i}
                            onClick={() => this.changePage(i)}
                            className="hover-item"
                        >{i}</Pagination.Item>
                    );
                }
            }
        } else {
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
        }

        if (this.props.totalResults >= this.props.sizePage) {
            if (this.props.totalResults % this.props.sizePage == 0) {
                items.push(<Pagination.Last key={totalPages + 1} onClick={() => this.changePage(totalPages)} />);
            } else {
                items.push(<Pagination.Last key={totalPages + 1} onClick={() => this.changePage(totalPages)} />);
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
            <div className="paginator-container">
                <div>
                    <p>Resultados totales: {this.props.totalResults}</p>
                </div>

                <div className="center">
                    <Pagination>
                        {this.state.items}
                    </Pagination>
                </div>
            </div>
        )
    };
}

export default Paginator;