// import personService from '../services/people';

// const DeleteButton = ({ person }) => {
// 	const handleDelete = () => {
// 		if (window.confirm(`Delete ${person.name}?`)) {
// 			personService
// 				.deletePerson(person.id);
// 		}
// 	}
// 	return (
// 		<button onClick={handleDelete}>delete</button>
// 	)
// }

// export default DeleteButton;

// import personService from '../services/people';

const DeleteButton = ({ person, handleDelete }) => {
    const handleDeleteClick = () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            handleDelete(person.id);
        }
    }
    return (
        <button onClick={handleDeleteClick}>delete</button>
    )
}

export default DeleteButton;
