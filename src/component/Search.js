import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "../component/Table";
import { Sortdata } from "../component/Sortdata";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dogList, setDogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    const filterDogs = dogList.filter(
      (eachDog) => eachDog.name === e.target.value
    );
    setDogList(filterDogs);
  };
  const handleSort = (e) => {
    const sortByValue = e.target.value;
    let sortedData = [];
    if (sortByValue === "name") {
      sortedData = dogList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortByValue === "life_span") {
      sortedData = dogList.sort((a, b) => {
        console.log(
          "Number(`a.${sortBy}`.substring(0,2))",
          a.life_span.match(/[0-9]+/),
          b.life_span.match(/[0-9]+/)
        );
        return (
          Number(a.life_span.match(/[0-9]+/)) -
          Number(b.life_span.match(/[0-9]+/))
        );
      });
    } else if (sortByValue === "height") {
      sortedData = dogList.sort(
        (a, b) =>
          Number(a.height.imperial.match(/[0-9]+/)) -
          Number(b.height.imperial.match(/[0-9]+/))
      );
    }
    setSortBy(sortByValue);
    setDogList(sortedData);
  };
  const getDogs = (searchValue) => {
    console.log("in get dogd");
    setLoading(true);
    axios
      .get(`https://api.thedogapi.com/v1/breeds/?search=${searchValue}`)
      .then((res) => setDogList(res.data))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!searchValue) {
      getDogs();
    }
  }, [searchValue]);

  return (
    <>
      {loading ? (
        <div>Loading..</div>
      ) : (
        <>
          <label htmlFor="search-dog">Search by breed</label>
          <input
            type="search"
            placeholder="search dogs"
            value={searchValue}
            onChange={handleSearch}
            data-testid="search-dog"
          />
          <Sortdata handleSort={handleSort} sortBy={sortBy} />
          <Table dogList={dogList} />
        </>
      )}
    </>
  );
};
export default Search;
