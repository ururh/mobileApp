// reducers.js
const initialState = {
  user: null,
  photoData:[],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
        case 'SET_PHOTO_DATA':
      return {
        ...state,
        photoData: action.payload,
      };
    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
