import React, { Component } from 'react';
import Phonebook from './Phonebook/Phonebook';

class App extends Component {
  render() {
    return (
      <div
        style={{ height: '100vh', padding: '20px' }}>
        <Phonebook/>
      </div>
    );
  }
};

export default App;
