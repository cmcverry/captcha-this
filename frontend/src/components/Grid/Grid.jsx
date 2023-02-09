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
            <ul className='row'>
                <Image image={props.imageList[0].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={0}/>
                <Image image={props.imageList[1].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={1}/>
                <Image image={props.imageList[2].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={2}/>
                <Image image={props.imageList[3].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={3}/>
            </ul>
            <ul className='row'>
                <Image image={props.imageList[4].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={4}/>
                <Image image={props.imageList[5].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={5}/>
                <Image image={props.imageList[6].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={6}/>
                <Image image={props.imageList[7].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={7}/>
            </ul>
            <ul className='row'>
                <Image image={props.imageList[8].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={8}/>
                <Image image={props.imageList[9].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={9}/>
                <Image image={props.imageList[10].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={10}/>
                <Image image={props.imageList[11].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={11}/>
            </ul>
            <ul className='row'>
                <Image image={props.imageList[12].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={12}/>
                <Image image={props.imageList[13].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={13}/>
                <Image image={props.imageList[14].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={14}/>
                <Image image={props.imageList[15].url} switch={switchCharAt} selection={selection} setSelection={setSelection} cid={15}/>
            </ul>
            <button id='solveButton' onClick={checkSolution}>Solve</button>
        </div>
    );
}

export default Grid;