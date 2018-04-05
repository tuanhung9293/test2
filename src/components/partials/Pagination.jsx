import React, { Component } from 'react';
import propsTypes from 'prop-types';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';

class Pagination extends Component {
  static props = {
    totalPage: propsTypes.number,
    forcePage: propsTypes.number,
    onChange: propsTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    totalPage: 10,
    forcePage: 1
  }

  render() {
    const { totalPage, forcePage } = this.props;

    return (
      <ReactPaginate
        breakLabel={<a href="#/">...</a>}
        breakClassName={"break-me"}
        pageCount={totalPage}
        forcePage={forcePage - 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={this.props.onChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        disableInitialCallback
      />
    );
  }
}

export default Pagination;
