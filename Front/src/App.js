import React from 'react';
import StoreProvider from './components/view/StoreProvider'
import FormListTodo from './components/view/FormListTodo';
import ShowListTodo from './components/view/ShowListTodo';

function App() {
  return <StoreProvider>
  <div className="container">

    <div className='row justify-content-center'><h1>Dashboard</h1></div>
    <div><h3>Ingrese la Lista</h3></div>
    
    <FormListTodo />
    <ShowListTodo />
    

  </div>
  </StoreProvider>
}

export default App;
