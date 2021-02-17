import React, { useState, useEffect} from 'react'
import SmartDropDown from "./SmartDropDown";
import "./SmartDropDown.css";
import { Data, defaultMoreCount } from "./SmartDropDownHelper";

function App(props) {
    const isAdmin = true;//queryValues.isAdmin;
    const [items, setItems] = useState();
    const [noOfItems, setNoOfItems] = useState(defaultMoreCount);
    const handleMoreCount = (moreCount) => {
        setNoOfItems(moreCount);
    }
    const addAndSelectHandler = (addValue) => {
        //you can add the new drop down value to DB here
        setItems([...items, { name: addValue }])
    }
    useEffect(() => {
        //initial render we can load from api network request.
        setItems(Data.data);
    }, []);

    return (
        <>
            <div style={{ width: "300px", marginLeft: "auto", marginRight: "auto", padding:"2px" }}>
                <SmartDropDown
                    id="dDCountry"
                    noOfItems={noOfItems}
                    items={items}
                    privilege={isAdmin}
                    addAndSelectHandler={addAndSelectHandler} 
                    handleMoreCount={handleMoreCount}
                    />
            </div>
        </>
    );
}
export default App

