import { injectReducer } from '../../../store/reducers'
import { browserHistory } from 'react-router'

export default (store) => ({
  path : 'logged/role0',
  onEnter: () => {
    if (!store.getState().auth.wallet) {
      browserHistory.push('/denied');
    }
  },
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const LoggedInRole0 = require('./LoggedInRole0').default
      const reducer = require('../../modules/role0').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'role0', reducer })

      /*  Return getComponent   */
      cb(null, LoggedInRole0)

    /* Webpack named bundle   */
    }, 'role0')
  }
})
