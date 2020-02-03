import React, { Component } from "react"
import * as PropTypes from "prop-types"

import StoreContext from "../../context/StoreContext"
import Input from "../Input/Input"
import Label from "../Label/Label"
import InputGroup from "../InputGroup/InputGroup"

import "./Home.scss"

class Home extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      currentPage: 1,
      postsPerPage: 12,
      userId: ""
    }
  }

  componentDidMount() {
    const { fetchPosts } = this.context
    fetchPosts()
  }

  onSelectedPost = id => {
    const { history } = this.props

    history.push({
      pathname: `/post/${id}`
    })
  }

  onSelectedPage = e => {
    this.setState({
      currentPage: Number(e.target.id)
    })
    window.scrollTo(0, 0)
  }

  renderPageNumbers = () => {
    const { postsPerPage } = this.state
    const {
      data: { posts }
    } = this.context
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i += 1) {
      pageNumbers.push(i)
    }

    if (pageNumbers.length <= 1) {
      return null
    }

    return pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.onSelectedPage}
          onKeyDown={this.onSelectedPage}
        >
          {number}
        </li>
      )
    })
  }

  renderPostComments = id => {
    const {
      data: { comments }
    } = this.context

    return comments
      .filter(comment => comment.postId === id)
      .map(postComments => {
        return (
          <div
            className="martian-home__post-single-comment"
            key={postComments.id}
          >
            <span>{postComments.name}</span>
            <span>{postComments.body}</span>
            <span>email: {postComments.email}</span>
          </div>
        )
      })
  }

  renderPosts = () => {
    const { currentPage, postsPerPage, userId } = this.state
    const {
      data: { posts, users, comments }
    } = this.context
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage

    const currentPosts =
      currentPage > 1 && userId.length > 0
        ? posts.slice(posts[0], posts.length)
        : posts.slice(indexOfFirstPost, indexOfLastPost)

    if (currentPosts.length > 0 && users.length > 0 && comments.length > 0) {
      return currentPosts.map(post => {
        return (
          <li
            key={post.id}
            onClick={() => {
              this.onSelectedPost(post.id)
            }}
            onKeyDown={() => {
              this.onSelectedPost(post.id)
            }}
          >
            <h6>{post.title}</h6>
            <p>{post.body}</p>

            <span>
              Name: {users.find(user => user.id === post.userId).name}
            </span>

            <div className="martian-home__post-comments">
              <h5>Comments:</h5> {this.renderPostComments(post.id)}
            </div>
          </li>
        )
      })
    }

    if (userId.length > 0 && currentPosts.length === 0) {
      return <div className="martian-no-results">No results</div>
    }

    return <div className="martian-loader">Loading...</div>
  }

  onInputChange = e => {
    const { fetchPostsPerUser, fetchPosts } = this.context

    this.setState(
      {
        userId: e.target.value.replace(/\D/, "")
      },
      () => {
        const { userId } = this.state

        if (userId === "") {
          fetchPosts()
          return
        }

        fetchPostsPerUser(userId)
      }
    )
  }

  render() {
    const { message } = this.props
    const { userId } = this.state

    // eslint-disable-next-line no-console
    console.log(`${message} Home Component.`)

    return (
      <div className="martian-home">
        <h1>Welcome to Mars</h1>
        <form
          className="martian-home__form"
          autoComplete="off"
          name="filterForm"
        >
          <InputGroup message="Hello from">
            <Label htmlFor="username" message="Hello from">
              Filter by Mars Id
            </Label>
            <Input
              type="text"
              name="filter"
              id="username"
              placeholder="Only numbers allowed"
              autoComplete="none"
              value={userId}
              onChange={this.onInputChange}
              message="Hello from"
            />
          </InputGroup>
        </form>

        <ul className="martian-home__posts">{this.renderPosts()}</ul>

        <ul className="martian-home__pagination">{this.renderPageNumbers()}</ul>
      </div>
    )
  }
}

Home.contextType = StoreContext

Home.propTypes = {
  history: PropTypes.object,
  message: PropTypes.string.isRequired
}

Home.defaultProps = {
  history: {}
}

export default Home
