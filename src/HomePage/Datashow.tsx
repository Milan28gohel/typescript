import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import { Table, Icon, Button,Checkbox,Modal } from "semantic-ui-react";
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


function Dashboard() {


  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
    


   
  })
  const { open, size } = state



  const [id,setId] = useState(null);
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
    setId(id)
    UserService.DeleteData(id).then(() => {
      getData();
    });
  };
// const [open,setOpen] = React.useState(false);

//  const handleClickOpen =(id:any)=>{
//     setId(id);

//     setOpen(true); 
//  }
// const handleClose =()=>{
//   setOpen(false);
// }
  // const sortdata = (id:any) => {
  //   UserService.sorting().then(() => {
  //     getData();
  //   });
  // };
  const nextpath = (path: any) => {
    history.push(path);
  };

  return (
    <div>
    <h1 >Data List</h1>

      <Icon style={{fontSize:'30px',textAlign:'left'}}name="user plus"  onClick={() => nextpath("/home")}/>

      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell >
              ID
            </Table.HeaderCell>
            <Table.HeaderCell>
              Data
            </Table.HeaderCell>
            <Table.HeaderCell >
              Date
            </Table.HeaderCell>
            <Table.HeaderCell>
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
                    <Button onClick={() =>  dispatch({ type: 'open'}) }>Delete</Button>

                    <Modal
        size={'mini'}
        open={open}
        // onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header> Delete Your Data</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your account</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            No
          </Button>
          <Button positive onClick={() => onDelete(id)}>
            Yes
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
