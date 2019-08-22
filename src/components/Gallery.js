import React, { Component } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";

class Gallery extends Component {
  render() {
    const { results, handleFullWidthImage, loadFunc, isLoading } = this.props;
    return (
      <div className="gallery">
        <div
          className="container"
          ref={ref => (this.scrollParentRef = ref)}
          style={{ height: "100%", overflowY: "auto" }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={true}
            threshold={200}
            loader={isLoading ? <div className="loader" key={0} /> : null}
            initialLoad={false}
            useWindow={false}
            getScrollParent={() => this.scrollParentRef}
          >
            <div className="gallery__items">
              {results.length > 0
                ? results.map(item => {
                    return (
                      <div className="gallery__item" key={item.id}>
                        <img
                          className="gallery__image"
                          src={item.previewURL}
                          alt={item.tags}
                          onClick={() => handleFullWidthImage(item)}
                        />
                      </div>
                    );
                  })
                : (
                   !isLoading && <div className="no-results">
                      <p>No results</p>
                    </div>
                  )}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  results: PropTypes.array.isRequired,
  handleFullWidthImage: PropTypes.func.isRequired,
  loadFunc: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default Gallery;
