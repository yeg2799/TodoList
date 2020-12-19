import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CategoryList extends Component {
  state = {
    categoryList: [],
  };
  componentDidMount() {
    this.getCategoryList();
  }
  getCategoryList = () => {
    fetch("http://localhost:3000/categoryList")
      .then((response) => response.json())
      .then((data) => this.setState({ categoryList: data }))
      .catch((err) => console.error(err));
  };
  render() {
    return (
      <div>
        <h1>Category List</h1>

        <ListGroup>
          {this.state.categoryList.map((category) => (
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
      </div>
    );
  }
}
