import React from 'react';

import ReactWebChat, { createDirectLine, createStore } from 'botframework-webchat';
import directLineDisconnect from 'botframework-webchat-core/lib/actions/disconnect';
import dispatchIncomingActivityMiddleware from './dispatchIncomingActivityMiddleware';
import { setShowCoponent } from './redux/actions';
import uuid from 'uuid';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.store = createStore({}, dispatchIncomingActivityMiddleware(props.appDispatch, this));
    this.activityMiddleware = this.setActivityMiddleware();
    this.attachmentMiddleware = this.setAttachmentMiddleware();

    this.state = {};

    this.setScan = this.setScan.bind(this);
    this.setRefresh = this.setRefresh.bind(this);
    this.sendScan = this.sendScan.bind(this);
    this.browserClose = this.browserClose.bind(this);
  }

  componentDidMount() {
    this.fetchToken();
    document.querySelector('.Scan').addEventListener('click', this.setScan);
    document.querySelector('.Refresh').addEventListener('click', this.setRefresh);
    window.addEventListener('beforeunload', this.browserClose);
 //   this.setSendBox();
  }

  componentWillUnmount(){
   // document.querySelector('#helpButton').addEventListener('click');
   this.store.dispatch({
    type: 'WEB_CHAT/SEND_POST_BACK',
    payload: { value: {buttonPressed: "&close"} }
  });
  }

  async fetchToken() {
    const myHeaders = new Headers();
    const userDetails = uuid.v4();
    console.log("userID :" + userDetails)
 //   myHeaders.append('Authorization', 'BotConnector ' + '_UB4r9uWKUI.nIwVUlzqzfulkeNniwoMnYoI8920fXhal4XNRZzs_aM');  
 //   const res = await fetch('https://webchat.botframework.com/api/tokens', { method: 'GET', headers: myHeaders });
//not server
  //  myHeaders.append('Authorization', 'Bearer ' + 'bQS1buT7-xU.rODAhrmteOhxClkJHYKgXDZdo85NAyN13SlyPRZ-iFg'); 
    myHeaders.append('Authorization', 'Bearer ' + 'TcVZTlkZdXo.C5VbrDs68WdgFHrEo2NQBa8lfgt9ohELEFN14YS9Gl8'); 
    myHeaders.append('Content-type', 'application/json');
    const res = await fetch('https://directline.botframework.com/v3/directline/tokens/generate', { 
                        body: JSON.stringify({ user: { id: userDetails, name: userDetails }}),
                        method: 'POST', headers: myHeaders });
    const { token } = await res.json();
    console.log("My Token: " + token);
    this.setState(() => ({
      directLine: createDirectLine({ token })
    }));
  }

  setActivityMiddleware(){
    return () => next => card => {
      return children => (
        <div
          className={card.activity.attachments && (card.activity.attachments[0].content.id === "Searching2" || "cartReview") ? card.activity.attachments && card.activity.attachments[0].content.id : ''}
        >
          {next(card)(children)}
        </div>
      );
    };

  }


  setAttachmentMiddleware(){
    return () => next => ({ card, activity, attachment: baseAttachment }) => {
      let attachment = baseAttachment;
      if (baseAttachment.content.body){
      switch (baseAttachment.content.body[0].id) {
        case 'review':                   
         for (let i = 0; i < attachment.content.body[1].items.length; i++) {
         attachment.content.body[1].items[i].items[3].columns[0].items[0].value = baseAttachment.content.body[1].items[i].items[3].columns[0].items[0].value.toString();
                                                                           } //for loop
         break;
         
         default:
           break;
        }
    }
    return next({ card, activity, attachment });
    };

  }

  setSendBox() {

    this.store.dispatch({
      type: 'WEB_CHAT/SET_SEND_BOX',
      payload: { text: 'sample:redux-middleware' }
    });
/*

    this.store.dispatch({
      type: 'WEB_CHAT/SEND_EVENT',
      payload: { name: 'membersAdded',
                 value: { language: window.navigator.language }
               }  
    }); */
  }

  setScan() {
    this.props.appDispatch(setShowCoponent(true));

 /*   
    this.store.dispatch({
      type: 'WEB_CHAT/SEND_MESSAGE',
      payload: { text: 'scan'}            
    }); */
  }

  sendScan(data){
    console.log(data);
    this.props.appDispatch(setShowCoponent(false));
    /*
    this.store.dispatch({
           type: 'WEB_CHAT/SEND_POST_BACK',
           payload: { value: {buttonPressed: "&scan", scanText: data.toString()} }
         });

   this.store.dispatch({
    type: 'WEB_CHAT/SEND_MESSAGE',
    payload: { 
      text: JSON.stringify({buttonPressed: "&scan", scanText: data.toString()}) }
  });
*/
this.store.dispatch({
  type: 'WEB_CHAT/SEND_POST_BACK',
  payload: { value: {buttonPressed: "&scan", scanText: data.toString()} }
});


  }

  setRefresh() {
    this.store.dispatch(directLineDisconnect());
    window.location.reload(true);

  }

  browserClose(){
    this.store.dispatch({
      type: 'WEB_CHAT/SEND_POST_BACK',
      payload: { value: {buttonPressed: "&close"} }
    });
  }

  render() {
    return this.state.directLine ? (
      <ReactWebChat
        activityMiddleware={this.activityMiddleware}
        attachmentMiddleware={this.attachmentMiddleware}
        directLine={this.state.directLine}
        store={this.store}
        styleOptions={{
          backgroundColor: 'Transparent',
          hideUploadButton: true
        }}
      />
    ) : (
      <div>Connecting to bot&hellip;</div>
    );
  }
  
}