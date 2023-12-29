import React, { useState, useEffect } from "react";

//to fetch the numbers from the API endpoint
async function fetchNumbers(): Promise<number[]> {
  const response = await fetch(
    "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new"
  );

  if (!response.ok) {
    throw new Error("Failed");
  }

  const text = await response.text();
  const numbers = text
    .trim()
    .split("\n")
    .map((numStr) => parseInt(numStr.trim(), 10));

  return numbers;
}

const Histo = () => {
  //

  return <div>Histo</div>;
};

export default Histo;
