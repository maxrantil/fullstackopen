import personService from '../services/persons';

const DeleteButton = ({ person }) => {
	const handleDelete = () => {
		if (window.confirm(`Delete ${person.name}?`)) {
			personService
				.deletePerson(person.id);
		}
	}
	return (
		<button onClick={handleDelete}>delete</button>
	)
}

export default DeleteButton;