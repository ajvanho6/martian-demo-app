/* eslint-disable no-console */
import React from "react"
import * as PropTypes from "prop-types"

import StoreContext from "../context/StoreContext"
import axiosInstance from "../api/axios"

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
      posts: []
    }
  }

  fetchPostsApi = () =>
    axiosInstance({
      method: "GET",
      url: BASE_POST_URL
    })
      .then(response => this.setState({ posts: response.data }))
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
    const { children } = this.props
    const { posts } = this.state

    return (
      <StoreContext.Provider
        value={{
          data: posts,
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
  children: PropTypes.any
}

CreateStore.defaultProps = {
  children: []
}

export default CreateStore
