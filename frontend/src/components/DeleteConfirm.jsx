import axios from "axios";
import React, { useState, useContext, useRef } from "react";
import { X } from "lucide-react";

function DeleteConfirm({ onClose, employee }) {
  const popupRef = useRef();
  const closePopup = (e) => {
    if (popupRef.current === e.target) {
      onClose();
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/employee/${id}`
      );
      console.log(response.data.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={popupRef}
      onClick={closePopup}
      className="fixed z-50 inset-0 bg-black bg-opacity-60 flex justify-center items-start pt-24"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-8">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Popup Content */}
        <div className="flex flex-col gap-4 items-center justify-center">
          <X size={80} color="red" className="border rounded-full p-2 border-red-500" />
          <h2 className="text-2xl font-semibold text-gray-700  mb-4">
            Are you sure?
          </h2>
          <p className="text-center text-gray-500">Do you really want to delete this record? This process cannot be undone</p>
          <div className="flex gap-2 justify-evenly items-center">
            <button
              onClick={onClose}
              className="border px-6 py-2 rounded font-bold text-white bg-gray-500 "
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(employee.id)}
              className="border px-6 py-2 font-bold rounded bg-red-500 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
