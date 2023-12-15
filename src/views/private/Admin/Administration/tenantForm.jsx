// YourReactComponent.jsx
import React, { useState } from "react";
import PermissionWrapper from "../../../../providers/PermissionsProvider";
import { PERMISSIONS } from "../../../../common";

import theme from "../../../../../config";

const TenantForm = () => {
  const addNewTenant = (newTenantName, newPhoneNumber, newBgColor) => {
    const newTenant = {
      contactpage: {
        phonenumber: newPhoneNumber,
        bgcolor: newBgColor,
      },
    };
    theme.tenants[newTenantName] = newTenant;
  };

  const [newTenantName, setNewTenantName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newBgColor, setNewBgColor] = useState("#ffffff");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the function to add the new tenant to the theme object
    addNewTenant(newTenantName, newPhoneNumber, newBgColor);

    // Clear form fields after submission
    setNewTenantName("");
    setNewPhoneNumber("");
    setNewBgColor("#ffffff");
    console.log(theme);
  };

  return (
    <PermissionWrapper permission={PERMISSIONS["User Management"]} view message>
      <div className="flex items-center justify-center min-h-screen">
        <form
          className="bg-white w-full h-full shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-[#0078BE] text-sm font-bold mb-2">
              Tenant Name:
              <input
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-[#0078BE] leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="newTenantName"
                value={newTenantName}
                onChange={(e) => setNewTenantName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-[#0078BE] text-sm font-bold mb-2">
              Phone Number:
              <input
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-[#0078BE] leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="newPhoneNumber"
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="block text-[#0078BE] text-sm font-bold mb-2">
              Background Color:
              <input
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-[#0078BE] leading-tight focus:outline-none focus:shadow-outline"
                type="color"
                name="newBgColor"
                value={newBgColor}
                onChange={(e) => setNewBgColor(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Tenant
            </button>
          </div>
        </form>
      </div>
    </PermissionWrapper>
  );
};

export default TenantForm;
