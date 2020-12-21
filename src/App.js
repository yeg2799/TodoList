import React, { Component } from "react";
import AddTask from "./AddTask";
import { Container, Col, Row } from "reactstrap";
import ListTodo from "./ListTodo";
import CategoryList from "./CategoryList";
import alertify from "alertifyjs";

const { REACT_APP_API_DOMAIN } = process.env;

const categoryListURI = `${REACT_APP_API_DOMAIN}/categoryList`;
const tasksURI = `${REACT_APP_API_DOMAIN}/tasks/`;

export default class App extends Component {
  state = {
    tasks: [],
    currentTask: "",
    currentCategory: "",
    currentId: "",
    currentSubject: "Homework",
    url: tasksURI,
    categoryList: [],
    updated: false,
  };

  componentDidMount() {
    this.getCategoryList();
    this.getTasks();
  }

  getCategoryList = () => {
    fetch(categoryListURI)
      .then((response) => response.json())
      .then((data) => this.setState({ categoryList: data }))
      .catch((err) => console.error(err));
  };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.setState({ currentId: category.id });
    this.getTasks(category.categoryName);
  };

  getTasks = (categoryName) => {
    let url = tasksURI;

    if (categoryName) {
      url += `?categoryid=${categoryName}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ tasks: data }))
      .catch((err) => console.error(err));
  };

  addTask = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      body: JSON.stringify({
        categoryid: this.state.currentSubject,
        task: this.state.currentTask,
      }),
    };
    fetch(this.state.url, requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ id: data.id }));

    alertify.success(this.state.currentTask + " is added", 1);
  };

  onChangeHandle = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  deleteTask = (task) => {
    alertify.confirm(
      "are you sure?",
      "are you wanna sure delete this task?",
      () => {
        fetch(this.state.url + task.id, {
          method: "DELETE",
        });
        alertify.error("Delete task :(");
      },
      () => {
        alertify.success("Cancel");
      }
    );
  };

  updateTask = (task) => {
    alertify.confirm(
      "are you sure?",
      "are you wanna sure update this task?",
      () => {
        fetch(this.state.url + task.id, {
          method: "PUT",
          body: JSON.stringify({
            id: task.id,
            categoryid: this.state.currentSubject,
            task: this.state.currentTask,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then(() => this.getTasks());
        alertify.success("Updated task");
      },
      () => {
        alertify.error("Cancel");
      }
    );
  };

  render() {
    return (
      <Container>
        <h1>My Todo</h1>
        <AddTask
          addTask={this.addTask}
          currenTask={this.state.currentTask}
          currentSubject={this.state.currentSubject}
          onChangeHandle={this.onChangeHandle}
          categoryList={this.state.categoryList}
        />
        <Row>
          <Col xs="3">
            <CategoryList
              categoryList={this.state.categoryList}
              changeCategory={this.changeCategory}
              currentCategory={this.state.currentCategory}
            />
          </Col>
          <Col xs="9">
            <ListTodo
              tasks={this.state.tasks}
              deleteTask={this.deleteTask}
              updateTask={this.updateTask}
              getTasks={this.getTasks}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
