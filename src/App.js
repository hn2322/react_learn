import { useState } from 'react';

function App() {
    const [toDo, setToDO] = useState('');
    const [toDos, setToDos] = useState([]);
    const onChange = (event) => setToDO(event.target.value);
    const onSubmit = (event) => {
        event.preventDefault();
        if (toDo === '') {
            return;
        } else {
            setToDos((currentArray) => [...currentArray, toDo]);
            setToDO('');
        }
    };
    const deleteBtn = (index) => {
        setToDos((curToDos) => curToDos.filter((_, curIndex) => curIndex !== index));
    };

    console.log(toDos);
    return (
        <div>
            <h1>My To Dos ({toDos.length})</h1>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={toDo} type="text" placeholder="Write your todo..." />
                <button>Add To Do</button>
            </form>
            <hr />
            <ul>
                {toDos.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => deleteBtn(index)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
