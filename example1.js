<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script type="application/javascript" src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
</head>
<body>
si totusi?
<div id="root"></div>

<script type="text/babel">
    const { useState,useEffect } = React

    const TestFlorin=()=>{
        return (
            <div>
                TestFlorin
            </div>
        );
    }

    const CatInputs = ({ idx, catState, handleCatChange }) => {
        console.log('render CatInputs');
        const catId = `name-${idx}`;
        const ageId = `age-${idx}`;
        useEffect(() => {
            console.log('useEffect in CatInputs')
        })

        return (
            <div key={`cat-${idx}`}>
                <label htmlFor={catId}>{`Cat #${idx + 1}`}</label>
                <input
                    type="text"
                    name={catId}
                    data-idx={idx}
                    id={catId}
                    className="name"
                    value={catState[idx].name}
                    onChange={handleCatChange}
                />
                <label htmlFor={ageId}>Age</label>
                <input
                    type="text"
                    name={ageId}
                    data-idx={idx}
                    id={ageId}
                    className="age"
                    value={catState[idx].age}
                    onChange={handleCatChange}
                />
            </div>
        );
    };

    const Form = () => {
        console.log('render Form');
        const [ownerState, setOwnerState] = useState({
            owner: '',
            description: '',
        });

        const handleOwnerChange = (e) => setOwnerState({
            ...ownerState,
            [e.target.name]: [e.target.value],
        });

        const blankCat = { name: '', age: '' };
        const [catState, setCatState] = useState([
            { ...blankCat },
        ]);

        const addCat = () => {
            setCatState([...catState, { ...blankCat }]);
        };

        const handleCatChange = (e) => {
            const updatedCats = [...catState];
            updatedCats[e.target.dataset.idx][e.target.className] = e.target.value;
            setCatState(updatedCats);
        };

        useEffect(() => {
            console.log('useEffect in Form')
        },[])

        return (
            <form>
                <label htmlFor="owner">Owner</label>
                <input
                    type="text"
                    name="owner"
                    id="owner"
                    value={ownerState.owner}
                    onChange={handleOwnerChange}
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    value={ownerState.description}
                    onChange={handleOwnerChange}
                />
                <input
                    type="button"
                    value="Add New Cat"
                    onClick={addCat}
                />
                {
                    catState.map((val, idx) => (
                        <CatInputs
                            key={`cat-${idx}`}
                            idx={idx}
                            catState={catState}
                            handleCatChange={handleCatChange}
                        />
                    ))
                }
                <input type="submit" value="Submit" />
            </form>
        );
    };

    const App = (props) => {
        console.log('render App');
        const [text, setText] = useState('hello');

        return (
            <div>
                <h1>{text}</h1>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <br />
                        <TestFlorin />
                        <br />
                        <Form />
            </div>
        );
    }

    const rootElement = document.getElementById('root')
    ReactDOM.render(<App />, rootElement)
</script>
</body>
</html>
