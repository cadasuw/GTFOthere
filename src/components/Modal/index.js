import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

class Modal extends React.Component {


    /*    constructor () {
      super();
      this.state = {
        showModal: false
      };
      console.log("in Modal/index.js");
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    
    handleOpenModal () {
      this.setState({ showModal: true });
    } */
    
    /* handleCloseModal () {
      this.props.showModal({ showModal: false });
    } */
    closeModal(){
        console.log(this);
        this.state({modalIsOpen: false});
      }
    
    render () {
      return (
        <div>
          <ReactModal 
             isOpen={this.props.showModal}
             contentLabel="Minimal Modal Example"
          >Modal Content from Peter
            <button onClick={this.closeModal}>Close Modal</button>
          </ReactModal>
        </div>
      );
    }
  }
  
  export default Modal;
  
