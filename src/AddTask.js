import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
export default class AddTask extends Component {
  render() {
    return (
      <div>
        <Form onSubmit={this.props.addtask}>
          <FormGroup>
            <Input
              type="textarea"
              name="currenttask"
              id="addTask"
              placeholder="Add Task Please"
              onChange={this.props.onChangeHandle}
            />
          </FormGroup>
          <FormGroup>
            <Input type="select" name="currentSubject" id="selectSubject" onChange={this.props.onChangeHandle}>
              <option>Homework</option>
              <option>Sport</option>
              <option>Reading</option>
              <option>Other</option>
            </Input>
          </FormGroup>
          <Button type="Submit" color="primary">
            Add Task
          </Button>
        </Form>
      </div>
    );
  }
}
