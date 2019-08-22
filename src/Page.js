import React, { Component } from "react";
import Search from "./components/Search";
import Gallery from "./components/Gallery";
import Modal from "./components/Modal";

const API_KEY = "13377281-2d79321e96d77a2f4a921a666";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      currentImage: "",
      isLoading: false,
      isVisible: false,
      isImageLoading: false,
      show: false,
      hasError: false,
      results: [],
      page: 1
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };
  hideModal = () => {
    this.setState({ show: false });
  };
  handleFetching = e => {
    e.preventDefault();
    this.setState({ initialLoad: false, results: [] });
    this.loadFunc();
  };
  loadFunc = () => {
    const { value, isLoading, page } = this.state;

    if (isLoading) return;
    this.setState({ isLoading: true }, () => {
      fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${value}&page=${page}&per_page=10`
      )
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(data => {
          this.setState({
            results: [...this.state.results, ...data.hits],
            page: this.state.page + 1
          });
        })
        .catch(() => {
          this.setState({
            hasError: true
          });
        })
        .finally(() => {
          this.setState({
            isLoading: false,
            isVisible: true
          });
        });
    });
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  handleFullWidthImage = item => {
    this.setState({ 
      currentImage: item.largeImageURL,
      show: true,
      isImageLoading: true
     });
  };
  handleImageLoad = () => {
    this.setState({ isImageLoading: false })
  }
  render() {
    const { 
      value, 
      results, 
      isVisible, 
      isLoading,
      isImageLoading } = this.state;
    return (
      <div className={`page ${isVisible ? "is-visible" : ""}`}>
        <Search
          value={value}
          handleChange={this.handleChange}
          handleFetching={this.handleFetching}
          isLoading={isLoading}
        />
        <Gallery
          results={results}
          handleFullWidthImage={this.handleFullWidthImage}
          loadFunc={this.loadFunc}
          isLoading={isLoading}
        />
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <div>
            {isImageLoading && <div className="loader loader--dark"></div>}
            <img src={this.state.currentImage} alt="" onLoad={this.handleImageLoad} />  
          </div>
        </Modal>
      </div>
    );
  }
}

export default Page;
