import { useState, useEffect } from "react";
import contactService from "./services/phonebook";
import { Person } from "./components/Person";
import { NumberForm } from "./components/NumberForm";
import { NameFilter } from "./components/NameFilter";
import { Notification } from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

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
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace old number with a new one?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        contactService
          .update(person.id, { ...person, number: newNumber })
          .then((returnedPerson) => {
            setNotificationMessage(`Updated ${newName}`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setPersons(
              persons.map((el) => (el.id !== person.id ? el : returnedPerson))
            );
          });
      }
    } else {
      contactService
        .create({ name: newName, number: newNumber })
        .then((returnedPerson) => {
          setNotificationMessage(
            `Added ${newName}`
          );
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          setPersons(persons.concat(returnedPerson));
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const removeName = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      contactService
        .remove(person.id)
        .then((returnedPerson) => {
          setPersons(persons.filter((el) => el.id !== person.id));
        })
        .catch((error) => {
          setNotificationMessage(
            `Information of ${person.name} has already been removed from the server`
          );
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          setPersons(persons.filter((n) => n.id !== person.id));
        });;
    }
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
      <Notification message={notificationMessage} />
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
