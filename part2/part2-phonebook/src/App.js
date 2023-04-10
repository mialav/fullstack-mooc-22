import { useState, useEffect } from "react";
import contactService from "./services/phonebook";
import { Person } from "./components/Person";
import { NumberForm } from "./components/NumberForm";
import { NameFilter } from "./components/NameFilter";

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

  const removeName = (person) => {
    window.confirm(`Delete ${person.name}?`);
    contactService.remove(person.id).then((returnedPerson) => {
      setPersons(persons.filter((el) => el.id !== person.id));
    });
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
          <Person
            person={person}
            key={person.name}
            removePerson={() => removeName(person)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
