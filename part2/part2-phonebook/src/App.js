import { useState, useEffect } from "react";
import contactService from "./services/phonebook";

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const NumberForm = ({
  addName,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const NameFilter = ({ filterValue, handleFilter }) => {
  return (
    <div>
      filter shown with <input value={filterValue} onChange={handleFilter} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    contactService.getAll().then((initialNotes) => {
      setPersons(initialNotes);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook`);
    } else {
      contactService
        .create({ name: newName, number: newNumber })
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const personsToShow = (persons, filterValue) => {
    if (filterValue === "") {
      return persons;
    } else {
      return persons.filter((person) =>
        person.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <NameFilter filterValue={filterValue} handleFilter={handleFilter} />
      <h2>Add new number</h2>
      <NumberForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        {personsToShow(persons, filterValue).map((person) => (
          <Person person={person} key={person.name} />
        ))}
      </div>
    </div>
  );
};

export default App;
