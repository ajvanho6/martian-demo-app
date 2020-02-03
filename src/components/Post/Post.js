/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react"
import * as PropTypes from "prop-types"

import StoreContext from "../../context/StoreContext"
import { getIdFromUrl } from "../../helpers"

import "./Post.scss"

const Post = ({ location, message }) => {
  // eslint-disable-next-line no-console
  console.log(`${message} Post Component.`)

  const context = useContext(StoreContext)

  const getPostIdFromUrl = () => {
    const { pathname } = location
    const postId = getIdFromUrl(pathname)
    return postId[0]
  }

  useEffect(() => {
    const { fetchPostsById } = context
    fetchPostsById(getPostIdFromUrl())
  }, [])

  const renderPost = () => {
    const {
      data: { posts }
    } = context

    const singlePost = posts.find(post => {
      // eslint-disable-next-line
      return (post.id = getPostIdFromUrl())
    })

    if (singlePost) {
      return (
        <>
          <h6>{singlePost.title}</h6>
          <p>{singlePost.body}</p>
          <span>User: {singlePost.userId}</span>
        </>
      )
    }
    return <div className="martian-loader">Loading...</div>
  }

  return (
    <div className="martian-post">
      <h1>Post from Mars</h1>
      {renderPost()}
    </div>
  )
}

Post.propTypes = {
  location: PropTypes.object,
  message: PropTypes.string.isRequired
}

Post.defaultProps = {
  location: {}
}

export default Post
