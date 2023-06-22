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
