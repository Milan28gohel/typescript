import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import {
  Table,
  Icon,
  Button,
  Checkbox,
  Modal,
  Header,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import _ from "lodash";

const TableData = [
  {
    id: "id",
    data: "data",
    due_date: "due_date",
    priority: "priority",
    complate: "complate",
    Delete: "Delete",
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
    data: TableData,
    direction: null,
  });

  const { column, direction } = state;

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    UserService.getAddData().then(
      (response) => {
        const { data = [] } = response;
        setPosts(data.data.todos);
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
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState(null);

  const handleClickOpen = (id: any) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const nextpath = (path: any) => {
    history.push(path);
  };

  const handleTableChange = () => {
    console.log(state);
    console.log("column", column);
    UserService.SortData(
      state.column,
      state.direction === "ascending" ? "asc" : "desc"
    ).then((getData) => {
      setPosts(getData.data.data.todos);
    });
  };

  return (
    <div>
      <h1>Data List</h1>

      <Icon
        style={{ fontSize: "30px", textAlign: "left" }}
        name="user plus"
        onClick={() => nextpath("/home")}
      />

      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "id" ? direction : null}
              onClick={() => {
                dispatch({ type: "CHANGE_SORT", column: "id" });
                handleTableChange();
              }}
            >
              ID
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === "data" ? direction : null}
              onClick={() => {
                dispatch({ type: "CHANGE_SORT", column: "data" });
                handleTableChange();
              }}
            >
              Data
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === "due_date" ? direction : null}
              onClick={() => {
                dispatch({ type: "CHANGE_SORT", column: "due_date" });
                handleTableChange();
              }}
            >
              Date
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === "priority" ? direction : null}
              onClick={() => {
                dispatch({ type: "CHANGE_SORT", column: "priority" });
                handleTableChange();
              }}
            >
              Priority
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === "complate" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "complate" })
              }
            >
              complate
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === "Delete" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "Delete" })
              }
            >
              Delete
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {posts.length !== 0
            ? posts.map((post: any, index: any) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{post.id}</Table.Cell>
                    <Table.Cell>{post.data}</Table.Cell>
                    <Table.Cell>{post.due_date}</Table.Cell>
                    <Table.Cell>{post.priority}</Table.Cell>
                    <Table.Cell collapsing>
                      {" "}
                      <Checkbox slider />{" "}
                    </Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => handleClickOpen(post.id)}>
                        Delete
                      </Button>
                    </Table.Cell>

                    <Modal open={open}>
                      <Modal.Header>Confirrmation</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <Header>sure you delete this data</Header>
                          <p>finally delete this data</p>
                        </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color="black" onClick={handleClose}>
                          cancel
                        </Button>
                        <Button
                          labelPosition="right"
                          icon="checkmark"
                          onClick={() => onDelete(id)}
                        >
                          {" "}
                          Delete
                        </Button>
                      </Modal.Actions>
                    </Modal>
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
