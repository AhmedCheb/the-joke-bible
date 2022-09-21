import React from "react";

const JokeBible = ({ joke }) => {
  // console.log(joke.categories);
  return (
    <>
      <div className="joke">
        <div></div>
        <div>
          <h3>
            {joke.categories.length > 0 ? joke.categories : "Uncategorized"}
          </h3>
          <br />
          <h3>{joke.value}</h3>
        </div>
      </div>
    </>
  );
};

export default JokeBible;
