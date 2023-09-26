import React from "react";
import PermissionWrapper from "../../../../providers/PermissionsProvider";
import PageProvider from "../../../../providers/PageProvider";
import { PERMISSIONS } from "../../../../common";
import { useState } from "preact/hooks";
import {
  TextInput,
  Button,
  Select,
  Paper,
  Textarea,
  Title,
  Box,
  Text,
  FileInput,
  Container,
  Flex,
  Stack,
  Image,
  Loader,
  LoadingOverlay,
  Alert,
} from "@mantine/core";

export default () => {
  const [formData, setFormData] = useState({
    copyright: "",
    imprint: "",
    privacyPolicy: "",
    help: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };
  return (
    <PermissionWrapper permission={PERMISSIONS["User Management"]} view message>
      <div className="flex flex-col h-[100%]  w-full items-start bg-gray-100">
        <div className="bg-white min-h-[100%] overflow-y-auto rounded-lg shadow-md w-full">
          <div
            style={{
              backgroundImage: 'url("/BG_Contacts1.png")',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="mb-4 "
          >
            <h1 className="text-2xl font-semibold font-sans text-white py-4 pl-8">
              General Information
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto flex flex-col ">
            <input
              type="text"
              title="Copyright"
              name="copyright"
              value={formData.copyright}
              onChange={handleChange}
              placeholder="Copyright"
              className="w-[80%] mx-8  p-2 border rounded-lg"
            />
            <textarea
              name="imprint"
              title="Imprint"
              value={formData.imprint}
              onChange={handleChange}
              placeholder="Imprint"
              className="w-[80%]  mx-8  p-2 border rounded-lg"
            />
            <textarea
              name="privacyPolicy"
              title="Privacy Policy"
              value={formData.privacyPolicy}
              onChange={handleChange}
              placeholder="Privacy Policy"
              className="w-[80%] mx-8   p-2 border rounded-lg"
            />
            <textarea
              name="help"
              title="Help"
              value={formData.help}
              onChange={handleChange}
              placeholder="Help"
              className="w-[80%] mx-8   p-2 border rounded-lg"
            />

            <button
              type="submit"
              style={{
                backgroundImage: 'url("/BG_Contacts1.png")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              className="bg-blue-500 mx-8 w-[10vw] font-bold  text-white px-4 py-2 rounded-md "
            >
              Submit
            </button>
          </form>

          <footer
            style={{
              backgroundImage: 'url("/BG_Contacts1.png")',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="bg-gray-200 p-4 text-gray-700 mt-4 w-full  fixed bottom-0"
          >
            <div className="container">
              <div className="flex justify-center items-center">
                <img src="/logo_TUV.svg" className="w-24" alt="" />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </PermissionWrapper>
  );
};
