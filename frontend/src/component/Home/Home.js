import React, { Fragment, useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <div class="wrap">
              <div class="search">
                <input
                  type="text"
                  class="searchTerm"
                  placeholder="What are you looking for?"
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  onClick={searchSubmitHandler}
                  type="submit"
                  class="searchButton"
                >
                  <CgSearch />
                </button>
              </div>
            </div>
            <h1> Get Amazing Stationary Products Below</h1>
            <a href="/container">
              <button>
                Search <CgSearch />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
