import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

export default class AddTask extends Component {
  render() {
    return (
      <Form onSubmit={this.props.addTask}>
        <FormGroup>
          <Input
            type="textarea"
            name="currentTask"
            id="addTask"
            placeholder="Add Task Please"
            onChange={this.props.onChangeHandle}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="select"
            name="currentSubject"
            id="selectSubject" 
            onChange={this.props.onChangeHandle}
          >
            {this.props.categoryList.map((category) => (
              <option key={category.id}>{category.categoryName}</option>
            ))}
          </Input>
        </FormGroup>
        <Button color="primary">Add Task</Button>
      </Form>
    );
  }
}
