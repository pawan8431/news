import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import NullImage from "../../components/Images/nullImage.png";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import { v4 as uuidv4 } from "uuid";
import { Col, Row, Button, Container, Alert } from "react-bootstrap";
import { header } from "../../config/config";
import { endpointPath } from "../../config/api";
import { Header, card } from "./index";

function News(props) {
  const { newscategory, country } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [freeApi, setFreeApi] = useState(false);
  const articlesPerPage = 4;

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const category = newscategory;
  const title = capitalize(category);
  document.title = `${title} - News`;

  const updateNews = async () => {
    try {
     // setLoading(true);
      const response = await axios.get(endpointPath(country, category));
      if (response.status === 200) {
        const parsedData = response.data;
        setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
        setLoading(false);
      } else if (response.status === 503) {
        setLoading(false);
        setFreeApi(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateNews();
  }, []);

  const handleMoreNews = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    updateNews();
  };

  const currentArticles = articles.slice(0, currentPage * articlesPerPage);

  return (
    <>
      {loading ? (
        <Loading />
      ) : freeApi ? (<>
        <Header>{header(title)}</Header>
        <Container className="d-flex justify-content-center mt-4">
            <Alert variant="danger" className="text-center">
              Oops, looks like you have used the daily API limit. Please try again tomorrow.
            </Alert>
          </Container>
        </>
      ) : (
        <>
          <Header>{header(title)}</Header>
          <Container>
            <Row>
              {currentArticles.map((element) => (
                <Col sm={12} md={6} lg={3} xl={3} style={card} key={uuidv4()}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    published={element.publishedAt}
                    channel={element.source.name}
                    alt="News image"
                    imageUrl={element.image || NullImage}
                    urlNews={element.url}
                  />
                </Col>
              ))}
            </Row>
            <Row className="mt-4">
              <Col className="d-flex justify-content-center">
                <Button onClick={handleMoreNews} className="mx-2" disabled={loading}>
                  More News
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

News.defaultProps = {
  country: "india",
  newscategory: "general",
};

News.propTypes = {
  country: PropTypes.string,
  newscategory: PropTypes.string,
};

export default News;
