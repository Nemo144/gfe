"use client"; // This is a client component 👈🏽

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
  //state for the histogram data
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    // Fetch data when component mounts
    async function fetchData() {
      try {
        const numbers = await fetchNumbers();
        setData(numbers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  //another effect hook for the histogram Logic
  useEffect(() => {
    //function to draw the histogram
    function drawHistogram(data: number[]) {
      //to get the id of the canvas html element hosting the graph
      const canvas = document.getElementById(
        "histogramCanvas"
      ) as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("canvas context unavailable");
        return;
      }

      //drawing a clean slate
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const maxValue = Math.max(...data);
      const barWidth = (canvas.width - 60) / data.length; // Adjusted for better spacing
      const padding = 40;
      const barSpacing = 20;

      // Draw x-axis
      ctx.beginPath();
      ctx.moveTo(padding, canvas.height - padding);
      ctx.lineTo(canvas.width + padding, canvas.height - padding);
      ctx.stroke();

      // Draw y-axis
      ctx.beginPath();
      ctx.moveTo(padding, canvas.height - padding);
      ctx.lineTo(padding, padding);
      ctx.stroke();

      // Draw x-axis labels
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      data.forEach((_, index) => {
        const label = index + 1;
        const x = padding + index * (barWidth + barSpacing) + barWidth / 2;
        ctx.fillText(label.toString(), x, canvas.height - padding + 10);
      });

      // Draw y-axis labels
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      const maxLabel = Math.ceil(maxValue / 10) * 10;
      for (let i = 0; i <= 5; i++) {
        const label = (maxLabel / 5) * i;
        const y =
          canvas.height - padding - (canvas.height - 2 * padding) * (i / 5);
        ctx.fillText(label.toString(), padding - 10, y);
      }

      // Draw bars
      data.forEach((value, index) => {
        const barHeight = (value / maxValue) * (canvas.height - 2 * padding);
        ctx.fillStyle = "blue";
        ctx.fillRect(
          padding + index * (barWidth + barSpacing),
          canvas.height - padding - barHeight,
          barWidth,
          barHeight
        );
      });
    }
    drawHistogram(data);
  }, [data]);

  return (
    <div>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Histogram
      </h2>
      <canvas id="histogramCanvas" width={400} height={300}></canvas>
    </div>
  );
};

export default Histo;
