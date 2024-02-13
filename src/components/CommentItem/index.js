// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleLikedButton, deleteComment} = props
  const {
    id,
    username,
    comment,
    isLiked,
    date,
    initialClassName,
  } = commentDetails
  const firstLetter = username ? username.slice(0, 1).toUpperCase() : ''

  // console.log(initialClassName)

  const onLikeButton = () => {
    toggleLikedButton(id)
  }

  const onDeleteButton = () => {
    deleteComment(id)
  }

  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const styleLikeStyle = isLiked ? 'blue-liked' : ''
  const postedTime = formatDistanceToNow(date)

  return (
    <li className="comment-container">
      <div className="comment-details-section">
        <div>
          <p className={`first-letter ${initialClassName}`}>{firstLetter}</p>
        </div>
        <div className="username-comment-section">
          <div className="username-time-section">
            <p className="username">{username}</p>
            <p className="time-of-uploaded">{postedTime}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <button
          className={`button like-button-text ${styleLikeStyle}`}
          type="button"
          onClick={onLikeButton}
        >
          <img className="button-image" src={likeImgUrl} alt="like" />
          Like
        </button>
        <button
          className="button"
          type="button"
          onClick={onDeleteButton}
          data-testid="delete"
        >
          <img
            className="button-image"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
            alt="delete"
          />
        </button>
      </div>
      <hr className="hr-line" />
    </li>
  )
}

export default CommentItem
