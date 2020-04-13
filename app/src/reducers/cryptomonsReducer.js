import {
  GET_USER_CRYPTOMONS,
  GET_USER_CRYPTOMONS_SUCCESS,
  GET_USER_CRYPTOMONS_FAILURE,
} from 'actions/cryptomonsActions';

export const initialState = {
  status: 'default',
  cryptomons: [],
};

const cryptomonReducer = (state, { type, payload }) => {
  const { status } = payload;
  switch (type) {
    case GET_USER_CRYPTOMONS:
    console.log('in first case', state);

      return {
        status,
      };
    case GET_USER_CRYPTOMONS_SUCCESS:
    console.log('in success case', state);

      return {
        status: payload.status,
        cryptomons: payload.cryptomons,
      };
    case GET_USER_CRYPTOMONS_FAILURE:
    console.log('in error case', state);

      return {
        status,
      };
    default:
      return initialState;
  }
}

export default cryptomonReducer;
