import React from "react"
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom";

export const Error = ({ history }) => (
  <div className="newQu">
    <h2>error 404...</h2>
    <h3>back to login</h3>
         <div >
              <NavLink  to="/login" className="close">back</NavLink>
         </div>
  </div>
);

Error.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
export default Error
