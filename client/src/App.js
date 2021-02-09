import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import useComponentVisible from "./hooks/useComponentVisible";

import Icon from "./components/Icon/Icon";

import "./App.scss";

function App() {
  const history = useHistory();
  const [inputText, setInputText] = useState("");
  const [selected, setSelected] = useState({});
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [lastId, setLastId] = useState(0);

  const fetchMoreData = () => {
    axios
      .get(
        `http://localhost:3001/api/countries/get?count=${10}&lastID=${lastId}`
      )
      .then(({ data: { success, message, countries, hasMore } }) => {
        if (success) {
          setData((prev) => [...prev, ...countries]);
          setLastId(countries[countries.length - 1].id);
          setHasMore(hasMore);
        } else {
          console.error(message);
        }
      });
  };

  useEffect(() => {
    console.log(history);
    const [_, id] = history.location.pathname.split("/");
    axios
      .get(`http://localhost:3001/api/countries/getById?id=${id}`)
      .then(({ data: { success, message, country } }) => {
        if (success) {
          setSelected(country);
        } else {
          console.error(message);
        }
      });
    fetchMoreData();
  }, []);

  const {
    ref,
    listRef,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  const handleClickVisible = () => {
    setIsComponentVisible(true);
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    history.push(`/${selected.id}`);
  }, [selected, history]);

  const handleChoose = (id) => () => {
    setSelected(data.find((el) => el.id === id));
    setInputText("");
    setIsComponentVisible(false);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 wrapper">
          <div
            ref={ref}
            className={`formSome ${isComponentVisible ? "active" : ""}`}
          >
            {isComponentVisible ? (
              <div className="form__dropdown">
                <div className="form__dropdown-label">Select country</div>
                <Icon handleClick={setIsComponentVisible} isUp={true} />
                <div className="form__dropdown-input">
                  <input
                    type="text"
                    className="form-control"
                    value={inputText}
                    onChange={handleChange}
                    placeholder="Type the name of country"
                  />
                </div>
                <ul ref={listRef} className="list">
                  <div id="scrollableDiv" className="list__wrapper">
                    <InfiniteScroll
                      loader={<div className="loading">Loading ...</div>}
                      scrollableTarget="scrollableDiv"
                      hasMore={hasMore}
                      dataLength={data.length}
                      next={fetchMoreData}
                    >
                      {inputText.length > 0
                        ? data
                            .filter(({ name }) =>
                              name
                                .toLowerCase()
                                .includes(inputText.toLocaleLowerCase())
                            )
                            .map(({ id, name }) => (
                              <li
                                className={`country`}
                                key={id}
                                onClick={handleChoose(id)}
                              >
                                {name}
                              </li>
                            ))
                        : data.map(({ id, name }) => (
                            <li
                              className={`country`}
                              onClick={handleChoose(id)}
                              key={id}
                            >
                              {name}
                            </li>
                          ))}
                    </InfiniteScroll>
                  </div>
                </ul>
              </div>
            ) : (
              <>
                <div onClick={handleClickVisible} className="form__selected">
                  {selected?.name}
                </div>
                <Icon handleClick={setIsComponentVisible} isUp={false} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
