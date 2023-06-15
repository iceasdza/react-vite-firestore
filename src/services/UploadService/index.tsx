import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { storage } from "../../utils/firebase";

const uploadProductsImage = async(documentId:string,image:any) => {
    const storageRef = ref(storage, `/products/${documentId}`);
    const snapshot = await uploadString(storageRef, image, "data_url")
    return await getDownloadURL(snapshot.ref);
}

const uploadMultipleProductImage = async(dataURL:Array<string>):Promise<any> => {
    return await Promise.all(dataURL.map((file,index) => uploadProductsImage(index.toString()+Date.now(),file)));
}

const formatImageAsDataURL = (file:any) => {
    return new Promise((resolve,reject) => {
        const reader = new FileReader();
        if(file) {
            reader.readAsDataURL(file);
        }
    
        reader.onloadend = (readerEvent) => {
            resolve(readerEvent.target?.result);
        }
        reader.onerror = (readerEvent) => {
            reject(readerEvent)
        }
    })
}

const getMultipleImageDataURL = async (files:any):Promise<string[]> => {
    const filesAsync = Array.from(files).map((file:any) => formatImageAsDataURL(file));
    const results = await Promise.all(filesAsync);
    return results.map((result:any) => result.toString())
}

export {uploadProductsImage, formatImageAsDataURL, getMultipleImageDataURL, uploadMultipleProductImage}