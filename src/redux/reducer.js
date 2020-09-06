import { SET_BACKGROUND_COLOR, SET_COMPONENT_VISB, SET_INPUT_VISB } from './actions';

// Make a more compelling demo than just changing background color

const DEFAULT_STATE = {
  backgroundColor: 'White',
  showCoponent: false,
  hideInput: false
};

export default function(state = DEFAULT_STATE, { payload, type }) {
  switch (type) {
    case SET_BACKGROUND_COLOR:
      state = { ...state, backgroundColor: payload.color };
      break;
      case SET_COMPONENT_VISB:
        state = { ...state, showCoponent: payload.visibile };
        break;
      case SET_INPUT_VISB:
        state = { ...state, hideInput: payload.visibility };
        break;        
    default:
      break;
  }

  return state;
}