import DeleteButton from './DeleteButton'

const Person = ({ person }) => {
	return (
		<div>
			{person.name} {person.number} <DeleteButton person={person} />
		</div>
	)
}

export default Person;