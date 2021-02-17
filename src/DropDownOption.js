import React, { forwardRef } from "react";
import { defaultMoreCount } from "./SmartDropDownHelper";

const  DropDownOption = forwardRef(
    ({ displayValue, inputValue, focused, selected, setFocus, handleMoreCount, remainingItems = 0, noOfItems=0, ...props }, ref) => {
        return (
                <li
                    ref={ref}
                    role="option"
                    aria-selected={selected}
                    className={`${focused && "focused"} ${selected && "selected"}`}
                    onMouseMove={setFocus}
                    {...props}
                >
                <span>{displayValue}</span>
                {remainingItems > 0 &&
                    <span
                    onClick={(e) => { e.stopPropagation(); handleMoreCount(noOfItems + defaultMoreCount); }}
                        className="more-link"
                     >
                    {remainingItems < noOfItems ? remainingItems : defaultMoreCount} more
                    </span>}
                </li>
            );
    }
);
export default DropDownOption;