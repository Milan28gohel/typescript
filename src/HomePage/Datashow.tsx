import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import { Table, Icon, Button,Checkbox } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import _ from "lodash";

const tableData = [
  {
    Id: "post.id",
    Data: "post.data",
    Date: "post.due_date",
    Priority: "post.priority",
    Delete: "",
  },
];

function exampleReducer(state: any, action: any) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending",
      };
    default:
      throw new Error();
  }
}

function Dashboard() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: tableData,
    direction: null,
  });
  const { column, data, direction } = state;

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    UserService.getAddData().then(
      (response) => {
        const { data = [] } = response;
        setPosts(data.data.todos);
        console.log("show data:::::::::::::", response.data.data);
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
  }, []);
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("auth_token");
    history.push("/login");
  };
  const getData = () => {
    UserService.getAddData().then((getData) => {
      setPosts(getData.data.data.todos);
    });
  };  
  const onDelete = (id: any) => {
    UserService.DeleteData(id).then(() => {
      getData();
    });
  };
  const nextpath = (path: any) => {
    history.push(path);
  };

  return (
    <div>
    <h1 >Add Data</h1>

      <Icon style={{fontSize:'30px',textAlign:'left'}}name="user plus"  onClick={() => nextpath("/home")}/>

      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "id" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "id" })}
            >
              ID
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "name" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "name" })}
            >
              Data
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "date" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "date" })}
            >
              Date
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "number" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "number" })
              }
            >
              Priority
            </Table.HeaderCell>
            <Table.HeaderCell>complate</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {posts.length !== 0
            ? posts.map((post: any, index) => {
                return (
               
                  <Table.Row key={index}>
                    <Table.HeaderCell>{post.id}</Table.HeaderCell>
                    <Table.HeaderCell>{post.data}</Table.HeaderCell>
                    <Table.HeaderCell>{post.due_date}</Table.HeaderCell>
                    <Table.HeaderCell>{post.priority}</Table.HeaderCell>
                    <Table.HeaderCell collapsing> <Checkbox slider /></Table.HeaderCell>
                    <Button onClick={() => onDelete(post.id)}>Delete</Button>
                  </Table.Row>
               
                );
              })
            : "No data found"}
        </Table.Body>
      </Table>
      <Button color="teal" onClick={logout}>
        logout
      </Button>
    </div>
  );
}

export default Dashboard;
