import React, { useEffect, useState } from "react";
import axios from "axios";

const Fib = () => {
  const [state, setState] = useState({
    seenIndexes: [],
    values: {},
    index: "",
  });

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setState({
      ...state,
      values: values.data,
    });
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setState({
      ...state,
      seenIndexes: seenIndexes.data,
    });
  };

  const renderSeenIndexs = () => {
    return state.seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];

    for (let key in state.values) {
      entries.push(
        <div key={key}>
          For index {key} i calculated {state.values[key]}
        </div>
      );
    }

    return entries;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("/api/values", {
      index: state.index,
    });
    setState({ ...state, index: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={state.index}
          onChange={(event) =>
            setState({ ...state, index: event.target.value })
          }
        />
        <button>Submit</button>
      </form>

      <h3>Indexes i have seen:</h3>
      {renderSeenIndexs()}
      <h3>calculated values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
