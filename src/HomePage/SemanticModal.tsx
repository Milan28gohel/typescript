import React from 'react'
import { Modal,Header,Button } from 'semantic-ui-react'

interface Modalprops{
    open?:boolean,
    header: any,
    onClick?:string,
    content:any
}

export default function SemanticModal({
  header,
  content,
  open,

}:  Modalprops){

    return (
        <div>
             <Modal open={open}>
                <Modal.Header>{header}</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Header>{content}</Header>
                    <p>finally add this data</p>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="black" 
                //   onClick={handleClose}
                  >
                    cancel
                  </Button>
                  <Button
                    labelPosition="right"
                    icon="checkmark"
                    // onClick={handleClickOpen}
                  >
                  {" "}
                    Add data
                  </Button>
                </Modal.Actions>
              </Modal>
        </div>
    )



}
         
        


   

