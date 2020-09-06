import { setInputVisibility } from './redux/actions';
export default function(dispatch, thisvariable) {
    return () => next => action => {
      if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
        const { activity } = action.payload;
 /* 
        if (activity.type === 'event' && activity.from.role === 'bot' && activity.name === 'redux action') {
          dispatch(activity.value);
        }
*/
        if (activity.attachments){

          switch (activity.attachments[0].content.id) {
            case 'Searching2':  
              var cartView=document.getElementsByClassName("Searching2");
              if (cartView.length > 0){
                cartView[cartView.length - 1].style.display='none';
              }
              break;
            case 'cartReview':  
              var cartReview=document.getElementsByClassName("cartReview");
              if (cartReview.length > 0){
                cartReview[cartReview.length - 1].style.display='none';
              }
              break;
              default:
              break;
                                                      }//switch

        }

        if (activity.from.role === 'bot'){
          var visible = thisvariable.store.getState("hideInput");
        var inputBox=document.getElementsByClassName("css-eycyw2");
        if (inputBox.length > 0){
          inputBox[inputBox.length - 1].style.display='block';
        }
                                          }
/*
        if (activity.value !== undefined && activity.value.buttonPressed === "&test"){
          const event = new Event('webchatincomingactivity');
          var btnArr=document.getElementsByClassName("ac-pushButton");
        //  btnArr[btnArr.length-1].style.display='none';
          btnArr[12].disabled="true";
          window.dispatchEvent(event);
        } */
      }


      if ((action.type === 'WEB_CHAT/SEND_POST_BACK') || (action.type === 'WEB_CHAT/SEND_MESSAGE')) { 
        var inputBox=document.getElementsByClassName("css-eycyw2");
        if (inputBox.length > 0){
          inputBox[inputBox.length - 1].style.display='none';
          dispatch(setInputVisibility(true));
        }
      }
  
      return next(action);
    };
  }