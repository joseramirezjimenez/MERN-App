import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      newMessage: null
    };
  }

  componentDidMount() {
    this.getDataFromDB();
    //Set up an interval to call the getDataFromDB function every second
    setInterval(this.getDataFromDB, 1000);
  }

  getDataFromDB = () => {
    axios({
      url: 'http://localhost:3000/api/getData',
      method: 'GET'
    }).then((response) => {
      console.log(response);
      //Updated our state with the data from the backend
      this.setState({ data: response.data.data });
    }).catch((error) => {
      console.log(error);
    })
  };
  

  postDataToDB = message => {
    //1. Figure out what ID this message needs to have
    //2. Use Axios to connect to our API server, which will send the data on to our database

    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      idToBeAdded++;
    }

    axios({
      url: 'http://localhost:3000/api/postData',
      method: 'POST',
      data: {
        id: idToBeAdded,
        message: message
      }
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  };

  renderListItems() {
    //Destructing the data object from our state object
    const { data } = this.state;

    if (data.length === 0) {
      //If our data array doesn't have any contents, display a message letting the user know that the database doesn't have anything inside it yet.
      return "NO DB ENTRIES YET";
    } else {
      return data.map(dat => (
        <li key={dat}>
          <span> id: {dat.id} </span>
          <span> message: {dat.message} </span>
        </li>
      ));
    }
  }

  render() {
    return (
      <div>
        {/* Display the data we retrieve from the database */}
        <ul>
          {this.renderListItems()}
        </ul>

        <div>
          <input
            type='text'
            placeholder='Add a New Message to the Database'
            onChange={event => this.setState({ message: event.target.value })}
          />
          <button onClick={() => this.postDataToDB(this.state.message)}>ADD</button>
        </div>

        <div>
          <input />
          <button>DELETE</button>
        </div>

        <div>
          <input />
          <input />
          <button>UPDATE</button>
        </div>
      </div>
    );
  }
}

export default App;
