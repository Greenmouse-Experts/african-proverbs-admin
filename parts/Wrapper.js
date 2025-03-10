import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../store/actions/authActions";
import Loader from "../components/UIElements/Loader";
import Router from "next/router";
import { fetchSystemProverbs } from "../store/actions/proverbActions";
import { fetchCategories } from "../store/actions/categoryAction";

const Wrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { proverbs } = useSelector((state) => state.proverb);
  const { categories, isLoadingcategories } = useSelector(
    (state) => state.Categories,
  );

  useEffect(() => {
    if (Router.pathname === "/") {
      Router.push("/dashboard");
    }

    if (user) {
      var timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      async function fetchUserData() {
        dispatch(getUserDetails());
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
      fetchUserData();
    }

    // if(!proverbs){
    //     console.log('<><><><><>trying to fetch all proverbs')
    //     dispatch(fetchSystemProverbs())
    // }

    //   if(!categories){
    //     console.log('<><><><><>trying to fetch all categories')
    //     dispatch(fetchCategories())
    // }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div id="wrapper">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Header />
            <Sidebar />
            <div class="content-page">{children}</div>
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default Wrapper;
