import { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';


const SearchBar = (props) => {

    const [search, setSearch] = useState('');

    const handleChange = (event) => {
        const target = event.target;
        setSearch(target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        async function postSearch() {
            try {
                const response = await axios({
                    method: "post",
                    url: 'https://backend-dot-captcha-this.ue.r.appspot.com/api',
                    data: {
                        search_term: search
                    }
                })
                props.handleImages(response.data.captcha);

            } catch (err) {
                // console.log(err);
            }
        }
        postSearch();
    }

    return (
    <div>
        <h3 id="instructiveHeader">Generate your own CAPTCHA:</h3>
        <form  onSubmit={handleSubmit}>
            <label>
                Search Term:
                <input type="text" id="searchTerm" name="search_term" placeholder='enter a search term' value={search} onChange={handleChange}></input>
            </label>
            <input id='generateButton' type="submit" value="Generate"></input>
        </form>
        <p>Try entering in a common search term to generate a random CAPTCHA.</p>
        <p>Disclaimer: CAPTCHA This claims no ownership of any image used. All images are licensed for public domain use.</p>
    </div>
    );
}

export default SearchBar;