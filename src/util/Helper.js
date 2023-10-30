
//function that is used to encode user's images
export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        //create a fileReader Object
        const fileReader = new FileReader();
        //FileReader object and reads the input file using the readAsDataURL method
        fileReader.readAsDataURL(file);
        //returns a promise if the file is successfully loaded and it is stored in a string format
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        // rejects with an error if an error occurs while loading the file.
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

export const resizeImage = (base64Str, maxWidth = 500, maxHeight = 500) => {
    return new Promise((resolve) => {
        let img = new Image();
        img.src = base64Str;
        img.onload = () => {
            let canvas = document.createElement("canvas");
            const MAX_WIDTH = maxWidth;
            const MAX_HEIGHT = maxHeight;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;
            //get a 2d of the canvas and namespaced it as ctx
            let ctx = canvas.getContext("2d");
            //ctx.drawImage(image variable, x, y, width ,height)
            //display the image on the canvas 
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL());
        };
    });
};