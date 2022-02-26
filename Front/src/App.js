import React from 'react';
import StoreProvider from './components/view/StoreProvider'
import FormListTodo from './components/view/FormListTodo';
import ShowListTodo from './components/view/ShowListTodo';

function App() {
  return <StoreProvider>
  <div className="container" id={"bordeConteiner"}>
    <div className='row justify-content-center'><h1>Reto Final</h1></div>
    <FormListTodo />
    <ShowListTodo />
  </div>
  </StoreProvider>
}

export default App;
