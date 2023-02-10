import react, { useState } from 'react';
import Image from '../Image/Image';
import './Grid.css';


const Grid = (props) => {

    let correctSelection = "";
    const [selection, setSelection] = useState("0000000000000000")
    const [success, showSuccess] = useState(false);
    const [failure, showFailure] = useState(false);

    for (let i = 0; i < props.imageList.length; i++){
        correctSelection = correctSelection.concat(props.imageList[i].searched.toString());
    }

    const switchCharAt = (idx) => {
        if (selection[idx] === '0'){
            return selection.substring(0, idx) + '1' + selection.substring(idx + 1);
        }
        else {
            return selection.substring(0, idx) + '0' + selection.substring(idx + 1);
        }
    }

    const checkSolution = () => {
        if (correctSelection === selection){
            showSuccess(true);
        } else {
            showFailure(true);
        }
    }

    const clearImages = () => {
        showSuccess(false);
        props.handleImages(null);
    }

    const gridImages = props.imageList.map((image, idx) =>
        <Image key={idx} image={image.url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={idx}/>
    );
    
    return (
        <div id='gridBody'>
            { (success) 
            ? 
            <div className="overlay">
                <div id='successPopup'>
                    <p>Nice! You selected the the correct images!</p>
                    <p>Clear the grid?</p>
                    <button onClick={clearImages}>
                        Yes
                    </button>
                    <button onClick={() => showSuccess(false)}>
                        No
                    </button>
                </div>
            </div>
            : null
            }
            { (failure) 
            ? 
            <div className="overlay">
                <div id='failurePopup'>
                    <p>Sorry! You selected the the incorrect images!</p>
                    <button onClick={() => showFailure(false)}>
                        Try Again
                    </button>
                </div>
            </div>
            : null
            }
            <div id='imageGridContainer'>
                {gridImages}
            </div>
            <button id='solveButton' onClick={checkSolution}>Solve</button>
        </div>
    );
}

export default Grid;