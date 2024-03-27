import React, { Component } from "react";
import CustomModal from "./Components/modal";
import axios from 'axios'; 
import Navbars from "./Components/navbar";
import './App.css';
import { AuthContextProvider } from "./Context/AuthContext";
import bg from './Static/image.png'

const bgHaiJi = {
  backgroundImage: `url(${bg})`, // Background image
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  width: "100vw",
  height:"100vh",
  position: "absolute",
  top: "0",
  zIndex: "-1",
  backgroundAttachment: "fixed",
};

// create a class that extends the component
class App extends Component {

    // add a constructor to take props
    constructor(props) {
      super(props);
  
      this.state = {
          viewCompleted: false,
          activeItem: {
              title: "",
              description: "",
              completed: false
          },
          taskList: [],
          // Add selectedTask and selectedTaskDescription
          selectedTask: null,
          selectedTaskDescription: ""
      };
  }

    // Add componentDidMount()
    componentDidMount() {
        console.log("Component did mount");
        this.refreshList();
    }


    refreshList = () => {
        console.log("Refreshing list");
        axios //Axios to send and receive HTTP requests
        .get("http://localhost:8000/api/tasks/")
        .then(res => this.setState({ taskList: res.data }))
        .catch(err => console.log(err));
    };

    // this arrow function takes status as a parameter
    // and changes the status of viewCompleted to true
    // if the status is true, else changes it to false
    displayCompleted = status => {
        console.log("Displaying completed: ", status);
        if (status) {
        return this.setState({ viewCompleted: true });
        }
        return this.setState({ viewCompleted: false });
    };

    // this array function renders two spans that help control
    // the set of items to be displayed(ie, completed or incomplete)
    renderTabList = () => {
        console.log("Rendering tab list");
        return (
        <div className="my-5 tab-list width-70vw">
            
            <span
            onClick={() => this.displayCompleted(false)}
            className={this.state.viewCompleted ? "" : "active"}
            >
            Incomplete Tasks
                </span>
                <span
            onClick={() => this.displayCompleted(true)}
            className={this.state.viewCompleted ? "active" : ""}
            >
            Completed Tasks
                </span>
        </div>
        );
    };
    // Main variable to render items on the screen
    // Modify the handleTaskClick function to toggle the dropdown visibility
    handleTaskClick = (item) => {
      if (this.state.selectedTask === item.id) {
          this.setState({
              selectedTask: null,
              selectedTaskDescription: ""
          });
      } else {
          axios
              .get(`http://localhost:8000/api/tasks/${item.id}/`)
              .then((res) => {
                  console.log("Description for task", item.id, ":", res.data.description);
                  this.setState({
                      selectedTask: item.id,
                      selectedTaskDescription: res.data.description
                  });
              })
              .catch((err) => console.log(err));
      }
  };
  

// Modify the renderItems function to fix the dropdown toggling
// Modify the handleTaskClick function to toggle the dropdown visibility


// Modify the renderItems function to fix the dropdown toggling
renderItems = () => {
  const { viewCompleted } = this.state;
  const newItems = this.state.taskList.filter(
      (item) => item.completed === viewCompleted
  );
  return newItems.map((item) => (
      <li
          key={item.id}
          className="list-group-item d-flex justify-content-evenly align-items-center"
      >
          <span
              className={`todo-title mr-2 ${
                  item.completed ? "completed-todo" : ""
              }`}
              title={item.description}
          >
              {item.title}
          </span>
          {item.description && (
              <span className="task-description">
                  {item.description}
              </span>
          )}
          <span>
              <button
                  onClick={() => this.handleDelete(item)}
                  className="btn btn-danger"
              >
                  {viewCompleted ? "Delete Task" : "Mark As Done"}
              </button>
          </span>
      </li>
  ));
};



  

    toggle = () => {
        console.log("Toggling modal");
        //add this after modal creation
        this.setState({ modal: !this.state.modal });
    };


    // Submit an item
    handleSubmit = (item) => {
        console.log("Handling submit");
        this.toggle();
        alert("save" + JSON.stringify(item));
        if (item.id) {
        // if old post to edit and submit
        axios
            .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
            .then((res) => this.refreshList());
        return;
        }
        // if new post to submit
        axios
        .post("http://localhost:8000/api/tasks/", item)
        .then((res) => this.refreshList());
    };

  handleDelete = (item) => {
    console.log("Handling delete/mark as done");
    if (!item.completed) {
        const newItem = { ...item, completed: true };
        axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, newItem)
        .then((res) => this.refreshList());
    } else {
        axios
        .delete(`http://localhost:8000/api/tasks/${item.id}/`)
        .then((res) => this.refreshList());
    }
};

    // Create item
    createItem = () => {
        console.log("Creating item");
        const item = { title: "", description: "", completed: false };
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    //Edit item
    editItem = (item) => {
        console.log("Editing item");
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    // Start by visual effects to viewer
    render() {
        console.log("Rendering app");
        return (
          <div className="yoyo" style={bgHaiJi}>
        <main className="content">
          <AuthContextProvider>
          <Navbars/>
            <h1 className=" text-uppercase text-center my-4 text-color-black" style={{ color: "black !important"}}>
            Homework Management
            </h1>
            <div className="row ">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                <div className="">
                    {/* <button onClick={this.createItem} className="btn btn-info">
                    Add task
                    </button> */}
                </div>
                {this.renderTabList()}
                <ul className="list-group list-group-flush">
                    {this.renderItems()}
                </ul>
                </div>
            </div>
            </div>
            {this.state.modal ? (
            <CustomModal
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
            />
            ) : null}
            </AuthContextProvider>
        </main>
        </div>
        );
    }
}
export default App;


