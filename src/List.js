import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item                                                         //Q1
const WrappedSingleListItem = ({                                            //This code defines a simple List component using React and PropTypes.
  index,                                                                    //The List component receives an array of items as a prop, and renders a list of SingleListItem 
  isSelected,                                                               //components for each item in the array. Each SingleListItem component is a clickable list item that displays the text of the item it represents
  onClickHandler,                                                           //When a SingleListItem is clicked, it triggers a handleClick function that sets the index of the clicked item as the selected index, and updates the style of the list item to indicate that it is selected.
  text,                                                                     //The List component also uses the useState hook to manage the selected index state, and the useEffect hook to reset the selected index when the items prop changes.
}) => {                                                                     //Finally, the code uses the memo function to optimize the rendering of the SingleListItem and List components by only re-rendering them when their props change.
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'white'}}
      onClick={() => onClickHandler(index)}
    >                                                                         
      {text}                                                                 
    </li>
  );
};

WrappedSingleListItem.propTypes = {                                          //Q2
  index: PropTypes.number,                                                   //In the SingleListItem component, the onClickHandler function is being called immediately when the component is rendered. To fix this, the onClickHandler function should be passed as a callback function.                                                    
  isSelected: PropTypes.bool,                                                //In the List component, the propTypes definition for the items prop is not correct. The correct syntax for defining an array of objects with PropTypes.
  text: PropTypes.string.isRequired,                                         //In the List component, the useState hook is not being used correctly. The correct syntax for defining a state variable and a function to update.
  onClickHandler: PropTypes.func.isRequired,                                 //In the List component, the default prop value for the items prop should be an empty array, not null.
  text: PropTypes.string.isRequired,                                         //In both the SingleListItem and List components, the memo function is not being used correctly. The correct syntax for using the memo function.
};                                                                           //In the List component, the isSelected prop being passed to the SingleListItem component is not being set correctly. It should be set to a boolean value based on whether the current index matches the selected index.

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items && items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={index === selectedIndex}
        />
      ))}
    </ul>
  );
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);

export default List;
