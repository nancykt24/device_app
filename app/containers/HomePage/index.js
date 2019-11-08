/*
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import { makeSelectDevice } from './selectors';
import { addDevice } from './actions';
import reducer from './reducer';
/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      items: [
        {
          id: 1,
          name: 'Samsung galaxy',
        },
        {
          id: 2,
          name: 'iphone10',
        },
      ],
      currentSessionItems: [],
      addItem: { id: '', name: '' },
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      addItem: { id: this.state.id, name: this.state.name },
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      items: [...this.state.items, this.state.addItem],
      id: '',
      name: '',
      addItem: { id: '', name: '' },
      currentSessionItems: [
        ...this.state.currentSessionItems,
        this.state.addItem,
      ],
    });
    this.props.addDevice(this.state.items);
  };

  render() {
    console.log('device', this.props.device);
    return (
      <div>
        <div style={{ margin: '0 auto', width: '750px', fontSize: '20px' }}>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group mt-3">
              <h1>Add Device</h1>
              <div>
                Id:
                <input
                  name="id"
                  type="text"
                  value={this.state.id}
                  onChange={this.handleChange}
                  style={{ width: '500px', height: '30px', fontSize: '14' }}
                />
              </div>
              <div>
                Name:
                <input
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                  style={{ width: '500px', height: '30px', fontSize: '14' }}
                />
              </div>
              <div>
                <button
                  type="submit"
                  form="nameform"
                  value="Submit"
                  style={{
                    backgroundColor: 'blue',
                    border: 'none',
                    color: 'white',
                    padding: '15px 32px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                  }}
                  onClick={this.handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
        <div style={{ margin: '0 auto', width: '750px', fontSize: '20px' }}>
          <h1>List Of Devices</h1>
          {this.state.items.map(item => (
            <table>
              <td style={{ paddingRight: '50px' }}>{item.id}</td>
              <td>{item.name}</td>
            </table>
          ))}
        </div>
        <div style={{ margin: '0 auto', width: '750px', fontSize: '20px' }}>
          <h1>Current Session Items</h1>
          {this.state.currentSessionItems.map(item => (
            <table>
              <td style={{ paddingRight: '50px' }}>{item.id}</td>
              <td>{item.name}</td>
            </table>
          ))}
        </div>
      </div>
    );
  }
}
HomePage.propTypes = {
  addDevice: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  device: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
export function mapDispatchToProps(dispatch) {
  return {
    addDevice: device => dispatch(addDevice(device)),
  };
}
const mapStateToProps = createStructuredSelector({
  device: makeSelectDevice(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withReducer,
  withConnect,
)(HomePage);
