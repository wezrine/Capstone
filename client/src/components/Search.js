import { Fragment, useState } from 'react';
import SearchDropdownItem, { SearchDropdownItemNoResult } from './SearchDropdownItem';

function Search(props) {
    const [data, setData] = useState(null);
    const [dataIsReady, setDataIsReady] = useState(false);
    const [dropdownIsopened, setDropdownIsopened] = useState(false);
    // const [keyword, setKeyword] = useState('');

    async function getRawgApi(gameName) {
        if (gameName !== '') {
            try {
                const response = await fetch(`https://api.rawg.io/api/games?key=00b7a7b22bfb4713982e46a6c4c79bf3&tags=multiplayer&search=${gameName.toLowerCase()}`);
                const json = await response.json();
                setData(json);
                setDataIsReady(true);
            } catch (err) {
                console.error(err);
            }
        }
    }


    const handleChange = event => {
        // setKeyword(event.target.value)
        setDropdownIsopened(true)
        getRawgApi(event.target.value)
    }

    const closeDropdown = () => {
        setDropdownIsopened(false)
        // setKeyword('')
    }

    const gameClicked = (game) => {
        setDropdownIsopened(false)
        props.gameClicked(game)
    }

    return (
        <Fragment>
            <div>
                <input
                    className="input"
                    type="text"
                    placeholder="Type in a game..."
                    autoComplete="off"
                    // value={keyword}
                    onChange={handleChange} />
                {dataIsReady ? (
                    <Fragment>
                        {dropdownIsopened ? (
                            <div className="dropdown-content">
                                <ul>
                                    {data.count >= 1 ? (data.results.slice(0, 8).map(result => <SearchDropdownItem gameClicked={gameClicked} key={result.id} result={result}/>)) : (<SearchDropdownItemNoResult />)}
                                </ul>
                                <div id='dropdownOverlay' onClick={closeDropdown} className='overlay-style'></div>
                            </div>
                        ) : null}
                    </Fragment>
                ) : null}
            </div>
        </Fragment>
    )
}

export default Search;