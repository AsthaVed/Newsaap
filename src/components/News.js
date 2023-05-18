import React,  {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

const News = (props) => {

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const[articles,setArticles] = useState([]);
  const[loading,setLoading] = useState(true);
  const[page,setPage] = useState(1);
  const[totalResults,setTotalResults] = useState(0)    

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();   //convert parsed data to json data
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disabled-next-line
  }, []);

  const handlePrevClick = async () => {
    setPage(page-1);
    updateNews();
  };

  const handleNextClick = async () => {
    setPage(page+1);
    updateNews();
}

    return (
        <div className="container my-3">
          <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
          {loading && <Spinner />}
          <div className="row">
            {!(loading) && articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title?element.title.slice(0, 45):""}
                description={element.description?element.description.slice(0, 88):""}
                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
              />
            </div>
            })}
            
          </div>
          <div className="container d-flex justify-content-between">
              <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
              <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
          </div>
        </div>
    );
}

News.defaultProps ={
  country: "in",
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number, 
  category: PropTypes.string
}
export default News;
