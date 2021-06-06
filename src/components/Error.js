import React from "react"
import PropTypes from "prop-types"

export const Error = ({ history }) => (
  <div>
    <h2>error 404...</h2>
      <button  onClick={() => history.push("/")}>
        Back Home
      </button>
  </div>
);

Error.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
export default Error
