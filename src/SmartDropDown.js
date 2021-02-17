import React, { useEffect, useState, useRef, useCallback, useMemo, memo } from "react";
import DropDownOption from './DropDownOption';

function SmartDropdown(props) {
    const {
        placeholder="Select",
        privilege,
        addAndSelectHandler,
        noOfItems,
        handleMoreCount,
        id,
    } = props;
    const [isOpen, setIsOpen] = useState();
    const [searchValue, setSearchValue] = useState("");
    const [items, setItems] = useState(props.items ? props.items : []);
    const [focusIndex, setFocusIndex] = useState(-1);

    const dropdownRef = useRef();
    const inputRef = useRef();
    const [inputVal, setInputVal] = useState("");

    const displayItems = useMemo(() => {
        return items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
    }, [items, searchValue, isOpen]);

    const openMenu = useCallback(() => {
        setIsOpen(true);
    }, [items.length, props]);

    // update the local value on props change
    useEffect(() => {
        if (props.items) {
            setItems(props.items);
        }
    }, [props.items]);

    // Scroll the focused option into view
    const menuRef = useRef();
    const focusedOptionRef = useRef();

    // `onClick` handler for the dropdown
    const toggleDropdown = () => {
        inputRef.current.focus();
        if (isOpen) {
            setIsOpen(false);
        } else {
            openMenu();
            setFocusIndex(-1);
            inputRef.current.select(); // Select the input text so that user can start typing to filter the values
        }
    };
    const setDropdownValue = (item) => {
        setInputVal(item.name);
        setSearchValue("");
    }

    const renderList = (item, i, remainingItems=0) => {
        return (
            <DropDownOption
                key={i}
                ref={focusIndex === i ? focusedOptionRef : null}
                focused={focusIndex === i}
                onClick={(e) => {
                    e.stopPropagation();
                    setDropdownValue(item);
                    inputRef.current.focus();

                }}
                inputValue={inputVal}
                displayValue={item["name"]}
                setFocus={
                    () => {
                        setFocusIndex(i);
                    }
                }
                remainingItems={remainingItems}
                noOfItems={noOfItems}
                handleMoreCount={handleMoreCount}
            />
        );
    };

    const renderDropdown = () => {
        const dropdownContainer = (
            <div className="dropdown-container">
                <div>
                    <input className="container-input" value={searchValue} placeholder="search" onChange={(e) => setSearchValue(e.target.value)} />
                </div>
                <ul ref={menuRef} className="dropdown">
                    {displayItems.length === 0 && searchValue &&
                        <li>
                        <span>{`"${searchValue}" not found`}</span>
                            {privilege===true &&
                               <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addAndSelectHandler(searchValue);
                                        setInputVal(searchValue);
                                        setSearchValue("");
                                    }}
                                    style={{ float: "right", color: "blue", border:"1px solid blue" }}
                                        >
                                           Add & Select
                               </span>
                            }
                        </li>
                    }
                    {displayItems.length > 0 ? (displayItems.length <= noOfItems?
                        displayItems.map((item, i) => renderList(item, i))
                        : displayItems.filter((item, i) => i < noOfItems).map((item, i) => renderList(item, i, i===noOfItems-1? displayItems.length - i - 1:0)))
                        : null
                    }
                 </ul>
            </div>
        );
           return dropdownContainer;
    };

    return (
        <div ref={dropdownRef} className="dropdown-container" role="listbox" aria-haspopup="listbox">
            <div
                className="dropdown-value"
                onClick={ toggleDropdown}
            >
                <input
                    type="text"
                    ref={inputRef}
                    value={inputVal}
                    id={id}
                    placeholder={placeholder}
                    disabled={true}
                    className="container-input"
                    title={placeholder}
                    autoComplete="off"
                />
            </div>
            {isOpen === true ? renderDropdown() : null}
        </div>
    );
}

export default memo(SmartDropdown);
