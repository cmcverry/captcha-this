import react, { useState } from 'react';
import './Image.css';

const Image = (props) => {

    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        props.setSelection(props.switch(parseInt(props.cid)));
        setSelected(!selected);
    }

    return (
        <div className={selected ? "gridImage selected" : "gridImage"} onClick={handleClick}>
            <img src={props.image} alt="grid-img"></img>
         </div>
    );
}

export default Image;