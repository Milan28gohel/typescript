import React, { useState } from "react";
import UserService from "../services/user.service";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./HomePage";

function FunctionBase() {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  
  UserService.getAddData().then(
    (response) => {
      const { data = [] } = response;
      setPosts(data.data.todos);
      console.log("show data:::::::::::::", response.data.data)
    },
    (error) => {
      const _data1 =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setPosts(_data1);
    }
  );
  return (
<div>
 
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Data</th>
          <th>Date</th>
          <th>Priority</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          posts.length !== 0 ?
            posts.map((post: any, index) => {
              return (
                <tr key={index}>
                  <td>{post.id}</td>
                  <td>{post.data}</td>
                  <td>{post.due_date}</td>
                  <td>{post.priority}</td>
                  <button> {post.Delete}Delete</button>
                </tr>
              )
            })
            : 'No data found'
        }
      </tbody>
    </table>
    </div>
  );

}

export default FunctionBase;
