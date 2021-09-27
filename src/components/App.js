import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import AddEditPets from './Pets/AddEditPets';
import DeletePet from './Pets/DeletePet';
import LoadPets from './Pets/LoadPets';

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={LoadPets} />
          <Route path="/pets/edit/:petId" exact component={AddEditPets} />
          <Route path="/pets/delete/:petId" exact component={DeletePet} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
