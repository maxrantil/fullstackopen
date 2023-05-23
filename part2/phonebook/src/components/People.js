// import Person from "./Person";

// const People = ({ peopleToShow }) => {
// 	return (
// 		<div>
// 			{peopleToShow.map(person => <Person key={person.id} person={person} />)}
// 		</div>
// 	)
// }

// export default People;

import DeleteButton from './DeleteButton';

const People = ({ peopleToShow, handleDelete }) => {
    return (
        <div>
            {peopleToShow.map((person, index) =>
                <div key={index}>
                    <span>{person.name}</span>
                    <span>{person.number}</span>
                    <DeleteButton person={person} handleDelete={handleDelete} />
                </div>
            )}
        </div>
    )
}

export default People;