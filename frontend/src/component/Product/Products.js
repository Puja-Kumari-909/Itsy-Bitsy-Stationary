import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const keyword = useParams().keyword;
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);


  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newValue) => {
    setPrice(newValue);
  };

  const price_marks = [
    {
      value: 0,
      label: `0`,
    },
    {
      value: 500,
      label: "0.5k",
    },
    {
      value: 1000,
      label: "1k",
    },
    {
      value: 1500,
      label: "1.5k",
    },
    {
      value: 2000,
      label: "2k",
    },
  ];

  let count = filteredProductsCount;

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products Online"} />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              aria-label="Small steps"
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              marks={price_marks}
              min={0}
              max={2000}
            />
         
          <ul className="categoryBox">
          <Typography>Categories</Typography>
            {categories.map((category) => (
              <li
                className="category-link"
                key={category}
                onclick={() => setCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>

          <fieldset>
          <Typography component="legend">Ratings</Typography>
            <Slider
              value={ratings}
              onChange={(e, newRating) => {
                setRatings(newRating);
              }}
              aria-label="Small steps"
              min={0}
              max={5}
              valueLabelDisplay="auto"
            />
          </fieldset> 
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
