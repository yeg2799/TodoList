import React, { Component, Fragment } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CategoryList extends Component {
  render() {
    return (
      <Fragment>
        <h1>Category List</h1>

        <ListGroup>
          {this.props.categoryList.map((category) => (
            <ListGroupItem
              active={
                category.categoryName === this.props.currentCategory
                  ? true
                  : false
              }
              key={category.id}
              onClick={() => this.props.changeCategory(category)}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Fragment>
    );
  }
}
