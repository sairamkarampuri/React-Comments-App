import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
const initialCommentsList = []

class Comments extends Component {
  state = {
    commentsList: initialCommentsList,
    username: '',
    comment: '',
  }

  // Toggle the like button
  toggleLikedButton = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  // Delete the comment
  deleteComment = id => {
    const {commentsList} = this.state
    const filteredList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )

    this.setState({commentsList: filteredList})
  }

  // Add new comment to list
  onAddComment = event => {
    event.preventDefault()
    const {username, comment} = this.state
    const initialBgColorClassName = `${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      username,
      comment,
      isLiked: false,
      date: new Date(),
      initialClassName: initialBgColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      username: '',
      comment: '',
    }))
  }

  handleChangeName = event => {
    this.setState({username: event.target.value})
  }

  handleChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {commentsList, username, comment} = this.state
    const commentsCount = commentsList.length

    return (
      <div className="bg-container">
        <div className="main-container">
          <h1 className="comments-heading">Comments</h1>
          <div className="top-container">
            <form className="form-container" onSubmit={this.onAddComment}>
              <p className="comments-description">
                Say something about 4.0 Technologies
              </p>
              <input
                className="input-name-box"
                type="text"
                value={username}
                placeholder="Your Name"
                onChange={this.handleChangeName}
              />
              <textarea
                className="comment-textarea"
                value={comment}
                placeholder="Your Comment"
                onChange={this.handleChangeComment}
                rows="6"
              />
              <div>
                <button type="submit" className="submit-button">
                  Add comment
                </button>
              </div>
            </form>
            <div className="img-section-container">
              <img
                className="comments-img"
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
              />
            </div>
          </div>
          <div className="bottom-container">
            <div className="no-of-comments-section">
              <p className="comments-count">{commentsCount}</p>
              <p className="comments-msg">Comments</p>
            </div>
            <ul className="comments-detail-container">
              {commentsList.map(eachComment => (
                <CommentItem
                  commentDetails={eachComment}
                  key={eachComment.id}
                  toggleLikedButton={this.toggleLikedButton}
                  deleteComment={this.deleteComment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
