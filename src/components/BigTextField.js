import React from "react";
import { useField } from "formik";

//The label prop is a string that represents the label for the form text area.
//The props prop is an object that contains any other props that should be passed to the form text area. 
const BigTextField = ({ label, ...props }) => {

    // useField hook from the formik library to get access to the state and meta information for a form text area.
    const [field, meta] = useField(props);
    return (
        <>
            <label className="block mb-2 text-sm text-gray-600">{label}</label>
           <textarea
                {...field}
                {...props}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-purple-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40"
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                }} 
            ></textarea>

            {meta.touched && meta.error ? (
                <p className="text-red-600 text-xs italic mt-1">{meta.error}</p>
            ) : null}
        </>
    );
};

export default BigTextField;