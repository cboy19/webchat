import React, { useState, createRef } from 'react';
import './App.css';
import ReactWebChat from './WebChat';
import { connect } from 'react-redux';
import { Container, Button, lightColors, darkColors } from 'react-floating-action-button';
import Scanner from './Scanner';
import "../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css";
import "../node_modules/@fortawesome/fontawesome-free/css/brands.css";
import "../node_modules/@fortawesome/fontawesome-free/css/solid.css";

class App extends React.Component{

  constructor(props) {
    super(props)
    this.scannerRef = createRef()
    this.child = React.createRef();
  }

render(){
  const {
    props: { backgroundColor, showCoponent, dispatch }
  } = this;


  if(showCoponent === undefined){showCoponent = false}

  return (
    <div id="app" style={{ backgroundColor }}>
        <div id="scan" ref={this.scannerRef} style={{position: 'relative', display: showCoponent ? 'block' : 'none', border: '3px solid red'}}>
                {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
                <canvas className="drawingBuffer" style={{
                    position: 'absolute',
                    top: '0px',
                    border: '3px solid green',
                    width: '100%'
                }} width="100%" height="100%" />
                {showCoponent ? <Scanner scannerRef={this.scannerRef}  onDetected={(result) => this.child.current.sendScan(result)} /> : null}
            </div>
      <div id="chat"  style={{display: showCoponent ? 'none' : 'block'}}>      
      <ReactWebChat ref={this.child} appDispatch={dispatch}/>  
      <Container>
            <Button
                tooltip="Refresh"
                icon="fas fa-redo fa-3x" 
                className="Refresh"
                styles={{backgroundColor: lightColors.grey, color: lightColors.grey}}/>
            <Button
                tooltip="Scan"
                icon="fas fa-barcode fa-3x" 
                className="Scan"
                styles={{backgroundColor: lightColors.grey, color: lightColors.grey}}/>           
            <Button
                tooltip="Options"
                icon="fas fa-plus fa-3x"
                rotate={true}                
                styles={{backgroundColor: lightColors.grey, color: lightColors.grey}}/>
      </Container> 
      </div>         
    </div>
  );
}

}

export default connect(({ backgroundColor,showCoponent }) => ({ backgroundColor,showCoponent }))(App);
