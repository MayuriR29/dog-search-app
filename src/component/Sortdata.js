import React from "react";
export const Sortdata = ({ handleSort, sortBy }) => {
  return (
    <select type="dropdown" value={sortBy} onChange={handleSort}>
      <option value="name"> Name</option>
      <option value="height"> Height</option>
      <option value="life_span"> Life Span</option>
    </select>
  );
};
