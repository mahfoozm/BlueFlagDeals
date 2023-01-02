import React, { Component } from "react";
import PostDataService from "../services/post-service";
import { withRouter } from '../common/with-router';

class Post extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getPost = this.getPost.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);

    this.state = {
      currentPost: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPost(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPost: {
          ...prevState.currentPost,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentPost: {
        ...prevState.currentPost,
        description: description
      }
    }));
  }

  getPost(id) {
    PostDataService.get(id)
      .then(response => {
        this.setState({
            currentPost: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentPost.id,
      title: this.state.currentPost.title,
      description: this.state.currentPost.description,
      published: status
    };

    PostDataService.update(this.state.currentPost.id, data)
      .then(response => {
        this.setState(prevState => ({
            currentPost: {
            ...prevState.currentPost,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePost() {
    PostDataService.update(
      this.state.currentPost.id,
      this.state.currentPost
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The post was updated successfully."
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePost() {    
    PostDataService.delete(this.state.currentPost.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/posts');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPost } = this.state;

    return (
      <div>
        {currentPost ? (
          <div className="edit-form">
            <h4>Hot Deals</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentPost.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentPost.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentPost.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentPost.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                Remove
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePost}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePost}
            >
              Edit
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a post.</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Post);