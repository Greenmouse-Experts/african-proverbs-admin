import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import withAuth from "../utils/withAuth";

const Index = () => {
  //   useEffect(() => {
  //     window.location.href = process.env.projectURL;
  // })

  return <p>index</p>;
};

export default withAuth(Index);
