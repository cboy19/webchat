const SET_BACKGROUND_COLOR = 'SET_BACKGROUND_COLOR';
const SET_COMPONENT_VISB = 'SET_COMPONENT_VISB';
const SET_INPUT_VISB = 'SET_INPUT_VISB';

function setBackgroundColor(color) {
  return {
    type: SET_BACKGROUND_COLOR,
    payload: { color }
  };
}

function setShowCoponent(visibile) {
  return {
    type: SET_COMPONENT_VISB,
    payload: { visibile }
  };
}

function setInputVisibility(visibility) {
  return {
    type: SET_INPUT_VISB,
    payload: { visibility }
  };
}


export { SET_BACKGROUND_COLOR, setBackgroundColor, SET_COMPONENT_VISB, setShowCoponent, SET_INPUT_VISB, setInputVisibility };