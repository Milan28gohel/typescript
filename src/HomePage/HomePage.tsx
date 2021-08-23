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
import { useHistory } from "react-router-dom";
import SemanticModal from "./SemanticModal";



const Home = (props: any) => {
  const [data, setData] = useState("");
  const [due_date, setDue_Date] = useState("");
  const [priority, setPriority] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state: any) => state.message);

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id: any) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
                onClick={handleClickOpen}
              >
                Create to do
              </Button>

              <Modal open={open}>
                <Modal.Header   header="add data"/>
                <Modal.Content>
                  <Modal.Description>
                    <Header content="sure you add this data"/>
                    <p>finally add this data</p>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="black" onClick={handleClose}>
                    cancel
                  </Button>
                  <Button
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => nextpath("/dash")}
                  >
                    {" "}
                    Add data
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
