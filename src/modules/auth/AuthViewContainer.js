import { connect } from 'react-redux';
import { compose } from 'recompose';
import AuthView from './AuthView';

import { userLogin } from '../../redux/actions/user.actions'

export default compose(
  connect(
    state => ({
      items: state,
    }),
    dispatch => ({
      userLogin: (token) => dispatch(userLogin(token)),
    }),
  ),
)(AuthView);
