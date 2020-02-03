/* eslint-disable no-console */
import React from "react"
import * as PropTypes from "prop-types"

import StoreContext from "../../context/StoreContext"
import axiosInstance from "../../api/axios"

const BASE_USER_URL = "/api/users"
const BASE_COMMENTS_URL = "/api/comments"
const BASE_POST_URL = "/api/posts?&_limit=100"
const FILTER_POST_URL_BY_USER = "/api/posts?userId="
const GET_POST_URL_BY_ID = "/api/posts?id="

const generateFilterPostByUserUrl = userId =>
  `${FILTER_POST_URL_BY_USER}${userId}`
const generateFilterPostByPostId = postId => `${GET_POST_URL_BY_ID}${postId}`

class CreateStore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      users: [],
      comments: []
    }
  }

  fetchCommentsApi = () =>
    axiosInstance({
      method: "GET",
      url: BASE_COMMENTS_URL
    })
      .then(response => this.setState({ comments: response.data }))
      .catch(error => {
        console.log(error)
      })

  fetchUsersApi = () =>
    axiosInstance({
      method: "GET",
      url: BASE_USER_URL
    })
      .then(response => {
        this.setState({ users: response.data })
        return this.fetchCommentsApi()
      })
      .catch(error => {
        console.log(error)
      })

  fetchPostsApi = () =>
    axiosInstance({
      method: "GET",
      url: BASE_POST_URL
    })
      .then(response => {
        this.setState({ posts: response.data })
        return this.fetchUsersApi()
      })
      .catch(error => {
        console.log(error)
      })

  fetchPostsPerUserApi = userId =>
    axiosInstance({
      method: "GET",
      url: generateFilterPostByUserUrl(userId)
    })
      .then(response => this.setState({ posts: response.data }))
      .catch(error => {
        console.log(error)
      })

  fetchPostsPerPostIdApi = postId =>
    axiosInstance({
      method: "GET",
      url: generateFilterPostByPostId(postId)
    })
      .then(response => this.setState({ posts: response.data }))
      .catch(error => {
        console.log(error)
      })

  render() {
    const { children, message } = this.props
    const { posts, users, comments } = this.state

    // eslint-disable-next-line no-console
    console.log(`${message} CreateStore Component.`)

    return (
      <StoreContext.Provider
        value={{
          data: {
            posts,
            users,
            comments
          },
          fetchPostsPerUser: this.fetchPostsPerUserApi,
          fetchPostsById: this.fetchPostsPerPostIdApi,
          fetchPosts: this.fetchPostsApi
        }}
      >
        {children}
      </StoreContext.Provider>
    )
  }
}

CreateStore.propTypes = {
  children: PropTypes.any,
  message: PropTypes.string
}

CreateStore.defaultProps = {
  children: [],
  message: ""
}

export default CreateStore
