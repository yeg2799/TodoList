import React, { Component } from "react";
import AddTask from "./AddTask";
import { Container,Col,Row} from "reactstrap";
import ListTodo from "./ListTodo";
import CategoryList from "./CategoryList";
import alertify from "alertifyjs";
export default class App extends Component {
  state = {
    tasks: [],
    currentTask: "",
    currentCategory:"",
    currentId:"",
    currentSubject:"Homework",
    url:"http://localhost:5000/tasks/",
    categoryList: [],
  };
 
  componentDidMount(){
    this.getCategoryList();
    this.getTasks();
  }
  getCategoryList = () => {
    fetch("http://localhost:5000/categoryList")
      .then((response) => response.json())
      .then((data) => this.setState({ categoryList: data }))
      .catch((err) => console.error(err));
  };
  getTasks = (categoryName) => {
    let url = "http://localhost:5000/tasks";
    if(categoryName){
      url+="?categoryid="+categoryName;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ tasks: data }))
      .catch((err) => console.error(err));
  };

  changeCategory=(category)=>{
    this.setState({currentCategory:category.categoryName});
    this.setState({currentId:category.id});
    this.getTasks(category.categoryName)
    
  }

  addTask = (event) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      body: JSON.stringify({ categoryid:this.state.currentSubject, task: this.state.currentTask }),
    };
    fetch(this.state.url, requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ id: data.id }));

     alertify.success("task is added",1);
     
  };
  onChangeHandle=(event)=>{
    this.setState({[event.target.name]:event.target.value})
}
handleSubmit=()=>{
  
}

deleteTask=(task)=>{
  fetch(this.state.url+task.id, {
    method: 'DELETE',
  });
  
  this.getTasks();
}

updateTask=(task)=>{
  
  fetch(this.state.url+task.id, {
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
                addTask={this.addTask}
                currenTask={this.state.currentTask}
                onChangeHandle={this.onChangeHandle}
                categoryList={this.state.categoryList}
              ></AddTask>
              <Row>
              <Col xs="3"><CategoryList categoryList={this.state.categoryList} changeCategory={this.changeCategory} currentCategory={this.state.currentCategory}></CategoryList></Col>
              <Col xs="9"><ListTodo tasks={this.state.tasks}  deleteTask={this.deleteTask} updateTask={this.updateTask} getTasks={this.getTasks}></ListTodo></Col>
              </Row>
             
          
        </Container>
      </div>
    );
  }
}
