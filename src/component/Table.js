import React from "react";

export const Table = ({ dogList }) => {
  return (
    <>
      <h1>Dogs List</h1>
      <table border={1}>
        <tr>
          <th>Name</th>
          <th>Height</th>
          <th>Life Span</th>
        </tr>
        {dogList.map((eachDog) => (
          <tr key={eachDog.id}>
            <td>{eachDog.name}</td>
            <td>{eachDog.height.metric}</td>
            <td>{eachDog.life_span}</td>
          </tr>
        ))}
      </table>
    </>
  );
};
