import React, { Component } from "react";
import { Table, Button } from "reactstrap";

export default class ListTodo extends Component {
  render() {
    return (
      <div>
        <h1>Your Todos</h1>
        <Table striped>
    <thead>
      <tr>
        <th>id</th>
        <th>Tasks</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {this.props.tasks.map((task) => (
      <tr key={task.id}>
        <th scope="row">{task.id}</th>
        <td>{task.task}</td>
        <td>
          {" "}
          <Button onClick={() => this.props.deleteTask(task)} color="danger">
            Delete
          </Button>{" "}
        </td>
        <td>
          {" "}
          <Button onClick={() => this.props.updateTask(task)} color="success">
            Update
          </Button>{" "}
        </td>
      </tr>
    ))}
  </tbody>
  </Table>
      </div>
    );
  }
}
