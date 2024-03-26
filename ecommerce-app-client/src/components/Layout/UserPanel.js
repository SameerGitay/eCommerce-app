import React from "react";
import { NavLink } from "react-router-dom";

const UserPanel = () => {
  return (
    <>
      <div className="text-center">
        <h4>My Dashboard</h4>
        <div className="list-group">
          <NavLink
            to="/dashboard/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserPanel;
