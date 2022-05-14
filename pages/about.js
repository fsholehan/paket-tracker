import React from "react";
import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";

export default function About() {
  const [stats, setStats] = useState({});

  const getStats = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/checkQuota?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    setStats(data);
  };
  // v1/checkQuota?api_key

  const limit = Math.floor(Number(stats[0]?.balance) / 15);
  console.log(limit);

  console.log(stats);
  useEffect(() => {
    getStats();
  }, []);
  return (
    <>
      <Header />
      <div className="container mx-auto mt-20 text-center">
        <div className="flex items-center justify-center space-x-12 md:flex-col md:space-y-10 md:space-x-0 ">
          <div>
            <h3 className="text-lg font-medium text-gray-500">Hit</h3>
            <span className="text-3xl font-semibold text-violet-500">
              {stats[0]?.count}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-500">Limit</h3>
            <span className="text-3xl font-semibold text-violet-500">
              {limit}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
