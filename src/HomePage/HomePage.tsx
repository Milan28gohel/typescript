import React, { useState } from "react";
import {  useSelector } from "react-redux";
import { Button, Form, Grid, Header, Segment} from "semantic-ui-react";


const Home = () => {
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
    const handleAdd = (e: any) => {
        e.preventDefault();
        const store ={data:data ,due_date:due_date,priority:priority}

        fetch('https://rails-to-do-list-narola.herokuapp.com/v1/todos',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'access-token': localStorage.getItem("auth_token") || '',
            },
            body:JSON.stringify(store),
        })
        .then(response => response.json())
        .then(data =>{
            console.log('Success:',data);
            console.log('token:',data.auth_token);
        })
        .catch((error)=>{
             console.error('Error:',error);
        });

    };
    return (

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form size='large' onSubmit={handleAdd} >
                    <Segment stacked>

                        <Header as='h2' color='teal' textAlign='center'>
                            <h1 >Add data</h1>
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

                        <Button color='teal' fluid size='large'>Create to do</Button>

                        {message && (
                            <div>
                                <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {message}
                                </div>
                            </div>
                        )}


                    </Segment>
                </Form>
            </Grid.Column>
  
        
        
        </Grid>

        
    );
};
export default Home;