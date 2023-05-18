import React from "react";

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } =
      props; //this.prpos is object (destructuring)
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display: "flex", justifyContent: "flex-end", right: '0'}}>
            <span
              className="position-absolute badge rounded-pill bg-danger"
              
            >
              {source}
            </span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://th.bing.com/th?id=OIP.CT2xzOkr1e0D77V51dvEHgHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-danger">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm  btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
