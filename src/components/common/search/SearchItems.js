import React from "react";

const ListItems = ({ items, onSelect }) => {
  return (
    <ul className="dropdown-menu show">
      {items.map((item, index) => (
        <li
          key={item + index}
          className="dropdown-item"
          onClick={() => onSelect(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListItems;