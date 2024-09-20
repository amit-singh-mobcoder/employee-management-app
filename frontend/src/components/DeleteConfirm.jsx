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
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-24"
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
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
            Are you sure you want to delete ?
          </h2>
          <div className="flex gap-2 justify-evenly items-center">
            <button
              onClick={onClose}
              className="border px-4 py-2 rounded font-bold text-white bg-yellow-500 "
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(employee.id)}
              className="border px-4 py-2 font-bold rounded bg-indigo-500 text-white"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
