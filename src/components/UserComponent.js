import React from 'react';
import UserService from '../services/UserService';
import axios from 'axios';

class UserComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            comments:'',
            users: [],
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleCommentsChange = this.handleCommentsChange.bind(this);
        this.submitDetails = this.submitDetails.bind(this);
    }

    componentDidMount() {
        UserService.getUsers().then((response) => {
            this.setState({ users: response.data })
        });
    }

    handleUsernameChange=(event) =>{
        this.setState({
            username: event.target.value
        })

    }

    handleCommentsChange=(event) =>{
        this.setState({
            comments: event.target.value
        })

    }

    submitDetails(event) {
        
        const taskDetails = {
            username: this.state.username,
            comments: this.state.comments
        };


        axios.post("http://localhost:8080/api/users", taskDetails)
            .then(response =>{
                if(response.data != null){
                    alert("Task saved");
                }
                else{
                    alert("Task not saved");
                }

            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitDetails}>
                    <div>
                        <label>Name </label>
                        <input type='text' value={this.state.username} onChange={this.handleUsernameChange} required/>
                    </div>
                    <div>
                        <label>Task  </label>
                        <textarea value={this.state.comments} onChange={this.handleCommentsChange} required></textarea>
                    </div>
                    <button>Submit</button>
                </form>
                <h1 className="text-center">Task List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Task</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(
                                user =>
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.task}</td>
                                        <td className="channel-btn"></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        )
    }
}

export default UserComponent;