import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { resizeImage } from "../util/Helper";

const ImageCropper = ({
    modalIsOpen,
    closeModal,
    uploadImageData,
    setImageSrc,
}) => {

    //customStyles constant is an object that defines the custom styles for the modal
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: "none",
            backgroundColor: "transparent",
        },
    };

    const cropperRef = useRef();
    //the image can change is the user crops the image / tries to upload a different image
    const [image] = useState(uploadImageData);

    //get the canvas and resize the image 
    //set the resized image as the new image source and close the modal
    const cropImage = async () => {
        const cropper = cropperRef.current;
        if (cropper) {
            const canvas = cropper.getCanvas();
            //call the resizeImage() function from the helper.js
            //resize the image and set the image to the ctx=canvas.getContext("2d")
            const resizedImage = await resizeImage(canvas.toDataURL());
            setImageSrc(resizedImage);
            closeModal();
        }
    };
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <div className="bg-white shadow rounded-lg mb-6 p-5">
                <div className="text-gray-600 text-lg font-semibold mt-2 mb-7">
                    Crop Photo
                </div>

                <Cropper
                    ref={cropperRef}
                    src={image}
                    className={"cropper"}
                    aspectRatio={1}
                />

                <footer className="flex justify-end mt-8 gap-2">
                    <button
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-400 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-purple-400 focus:ring focus:ring-purple-300 focus:ring-opacity-50"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-400 focus:ring focus:ring-purple-300 focus:ring-opacity-50"
                        onClick={cropImage}
                    >
                        Crop
                    </button>
                </footer>
            </div>
        </Modal>
    );
};

export default ImageCropper;