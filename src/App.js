import React, { Component } from "react";
import AddTask from "./AddTask";
import { Container,Col,Row} from "reactstrap";
import ListTodo from "./ListTodo";
import CategoryList from "./CategoryList";
import alertify from "alertifyjs";
export default class App extends Component {
  state = {
    tasks: [],
    currenttask: "",
    currentcategory:"",
    currentid:""
  };
  componentDidMount() {
    this.getTasks();
    
  }
  getTasks = (categoryid) => {
    let url = "http://localhost:3000/tasks";
    if(categoryid){
      url+="?categoryid="+categoryid;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ tasks: data }))
      .catch((err) => console.error(err));
  };
  changeCategory=(category)=>{
    this.setState({currentcategory:category.categoryName});
    this.setState({currentid:category.id});
    this.getTasks(category.id)
    
  }
  AddTask = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      body: JSON.stringify({ categoryList:this.state.currentid, task: this.state.currenttask }),
    };
    fetch("http://localhost:3000/tasks", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ id: data.id }));

     alertify.success("task is added",1);
     this.getTasks();
  };
  onChangeHandle=(event)=>{
    let name=event.target.name;
    let value=event.target.value;
    this.setState({[name]:value})
   
}
deleteTask=(task)=>{
  fetch('http://localhost:3000/tasks/'+task.id, {
    method: 'DELETE',
  });
  this.getTasks();
}
updateTask=(task)=>{
  fetch('http://localhost:3000/tasks/'+task.id, {
  method: 'PUT',
  body: JSON.stringify({
    id: task.id,
    categoryList:task.categoryList,
    task:this.state.currenttask,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
}
  render() {
    return (
      <div>
        <Container>
          <h1>My Todo</h1>
              <AddTask
                addtask={this.AddTask}
                currentask={this.state.currenttask}
                onChangeHandle={this.onChangeHandle}
              
              ></AddTask>
              <Row>
              <Col xs="3"><CategoryList changeCategory={this.changeCategory} currentCategory={this.state.currentcategory}></CategoryList></Col>
              <Col xs="9"><ListTodo tasks={this.state.tasks}  deleteTask={this.deleteTask} updateTask={this.updateTask}></ListTodo></Col>
              </Row>
             
          
        </Container>
      </div>
    );
  }
}
