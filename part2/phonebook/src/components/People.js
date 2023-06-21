import DeleteButton from './DeleteButton';

const People = ({ peopleToShow = [], handleDelete }) => {
    return (
        <div>
            {peopleToShow.map((person, index) =>
                <div key={index}>
                    <span className="space">{person.name}</span>
                    <span className="space">{person.number}</span>
                    <DeleteButton className="space" person={person} handleDelete={handleDelete} />
                </div>
            )}
        </div>
    )
}

export default People;