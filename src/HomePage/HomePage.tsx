import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon,
  Modal,
} from "semantic-ui-react";
import { hom } from "../interface/interface";
import { useHistory } from "react-router-dom";

function exampleReducer(state:any, action:any) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }
}





const Home: React.FC<hom> = () => {
  const [data, setData] = useState("");
  const [due_date, setDue_Date] = useState("");
  const [priority, setPriority] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state: any) => state.message);


  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  })
  const { open, size } = state


  const onChangeData = (e: any) => {
    const data = e.target.value;
    setData(data);
  };
  const onChangeDue_Date = (e: any) => {
    const due_date = e.target.value;
    setDue_Date(due_date);
  };
  const onChangePriority = (e: any) => {
    const priority = e.target.value;
    setPriority(priority);
  };
  const history = useHistory();

  const handleAdd = (e: any) => {
    e.preventDefault();
    const store = { data: data, due_date: due_date, priority: priority };

    fetch("https://rails-to-do-list-narola.herokuapp.com/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("auth_token") || "",
      },
      body: JSON.stringify(store),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        console.log("token:", data.auth_token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const nextpath = (path: any) => {
    history.push(path);
  };
  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <h2>Add data</h2>
          <Icon
            style={{ fontSize: "30px", textAlign: "left" }}
            name="pointing left"
            onClick={() => nextpath("/dash")}
          />

          <Form size="large" onSubmit={handleAdd}>
            <Segment stacked>
              <Header as="h2" color="teal" textAlign="center">
                <h1>Add data</h1>
              </Header>

              <Form.Input
                type="data"
                name="data"
                placeholder="data"
                value={data}
                onChange={onChangeData}
              />

              <Form.Input
                type="date"
                placeholder="due_date"
                name="due_date"
                value={due_date}
                onChange={onChangeDue_Date}
              />
              <Form.Input
                type="number"
                placeholder="priority"
                name="priority"
                value={priority}
                onChange={onChangePriority}
              />
              <Button
                color="teal"
                fluid
                size="large"
                onClick={() => dispatch({ type: 'open', size: 'mini' })}
              >
                Create to do
              </Button>


              <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header>ADDYour Data</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to add your account</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            No
          </Button>
          <Button positive onClick={() => nextpath("/dash")}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
              <br />
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};
export default Home;
