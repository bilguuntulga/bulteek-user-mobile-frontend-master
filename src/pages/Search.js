/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, } from "react";
import Layout from "components/Layout";

import { Input, Row, Col, Radio, Button } from "antd";
import Card from "@components/card";
import { MovieAPI } from "apis";
import Empty from "antd/es/empty";
import MoviesAll from "layout/MoviesAll";

const Search = () => {

  const containerRef = React.useRef();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [afterLoading, setAfterLoading] = useState(false);
  const [filter, setFilter] = React.useState({
    query: "",
    movie_type: ""
  });

  const [count, setCount] = React.useState(null)

  const [offset, setOffset] = React.useState({
    page: 1,
    limit: 50
  });

  const onSearch = (e) => {
    setFilter({
      ...filter,
      query: e
    });

  }

  const loadingItems = (
    <Row gutter={[5, 48]} className="mt-2">
      <Col xs={8} sm={6} md={8} lg={6} xl={4} >
        <Card loading />
      </Col>
      <Col xs={8} sm={6} md={8} lg={6} xl={4} >
        <Card loading />
      </Col>
      <Col xs={8} sm={6} md={8} lg={6} xl={4} >
        <Card loading />
      </Col>

      <Col xs={8} sm={6} md={8} lg={6} xl={4} >
        <Card loading />
      </Col>

      <Col xs={8} sm={6} md={8} lg={6} xl={4} >
        <Card loading />
      </Col>

      <Col xs={8} sm={6} md={8} lg={6} xl={4} >
        <Card loading />
      </Col>
      <Col xs={8} sm={6} md={8} lg={6} xl={4} >
        <Card loading />
      </Col>

      <Col xs={8} sm={6} md={8} lg={6} xl={4} >
        <Card loading />
      </Col>

      <Col xs={8} sm={6} md={8} lg={6} xl={4} >
        <Card loading />
      </Col>
    </Row>
  )

  const handleTypeChange = (e) => {
    if (!loading && !afterLoading) {
      if (e !== "all") {
        setFilter({
          ...filter,
          movie_type: e
        })
      } else {
        setFilter({
          ...filter,
          movie_type: ""
        })
      }
    }
  };

  const reload = React.useCallback(async (signal, _offset) => {
    // alert("a");

    // if(loading) return;
    console.log("asdasdasdasdsadasd");
    if ((filter.query && filter.query !== "") || (filter.movie_type && filter.movie_type !== "")) {
      // alert("asd")
      if (loading) return;

      if (offset.page === 1) {
        setLoading(true);
        setMovies(null);
      } else {
        setAfterLoading(true);
      }


      try {
        const res = await MovieAPI.list({
          filter: filter,
          offset: offset,
        }, { signal });

        if (offset.page === 1) {
          setCount(res.count);
          setMovies(res.rows);
        } else {
          setMovies([
            ...movies,
            ...res.rows
          ]);
        }
      } catch (err) {
        console.log(err);
        // notification.warning({
        //   message: "Сервертэй холбогдоход алдаа гарлаа",
        // });
      }

      setTimeout(() => {
        setLoading(false);
        setAfterLoading(false);
      }, 300)

    }
  }, [filter, offset])

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    reload(signal);

    // return () => abortController.abort();

  }, [offset]);


  React.useEffect(() => {

    setOffset({
      page: 1,
      limit: 50
    });

    return

  }, [filter])


  return (
    <Layout>
      <div className="p-3 search">
        <div className="search__controls">
          <Input
            placeholder="Хайх..."
            allowClear
            size="large"
            onChange={(e) => onSearch(e.currentTarget.value)}
            className="search__input"
          />
          {
            !loading && movies && movies.length > 0 && (
              <Radio.Group checked value={filter.movie_type === "" ? "all" : filter.movie_type} onChange={(e) => {
                console.log("radio button ", e);
                handleTypeChange(e.target.value);
              }}>
                <Radio.Button value="all">Бүгд</Radio.Button>
                <Radio.Button value="ONE_EPISODE">Бүрэн хэмжээний</Radio.Button>
                <Radio.Button value="MANY_EPISODES">Цуврал</Radio.Button>
              </Radio.Group>
            )
          }
        </div>
        {filter.query && filter.query !== "" ? (
          <div className="movie-column">
            {loading ? (
              <Row gutter={[5, 48]} className="mt-5">
                {loadingItems}
              </Row>
            ) : movies && movies.length > 0 ? (
              <Row gutter={[5, 48]} className="mt-5">
                {movies.map((item) => (
                  <Col xs={8} sm={6} md={8} lg={6} xl={4} key={item.id}>
                    <Card image={item.poster} movie={item} />
                  </Col>
                ))}

                {
                  afterLoading ? (

                    loadingItems

                  ) : (
                    count > movies.length && (
                      <Col xs={24}>
                        <Row justify="center">
                          <Col xs={24}>
                            <Button
                              onClick={() => {
                                setOffset({
                                  ...offset,
                                  page: offset.page + 1,
                                });
                              }}
                              block size="large" type="primary" style={{ margin: "auto" }}>Илүү их харах</Button>
                          </Col>
                        </Row>
                      </Col>
                    )
                  )
                }

              </Row>
            ) : (
              <div className="search-empty-text d-flex justify-content-center align-items-center">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Таны хайсан кино алга байна "
                />
              </div>
            )}
          </div>
        ) : (
          <MoviesAll />
        )}
      </div>
    </Layout>
  );
};

export default Search;
