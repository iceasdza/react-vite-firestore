import { addDoc, collection, deleteDoc, doc, getCountFromServer, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

const addProduct = async (payload: any) => {
  try {
    await addDoc(collection(db, "product"), payload);
  } catch (err) {}
};

const editProduct = async (productId: string, payload: any) => {
  try {
    const productRef = doc(db, "product", productId);
    await updateDoc(productRef, payload);
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (productId:string) => {
    try {
    const productRef = doc(db, "product", productId);
    await deleteDoc(productRef);
    } catch (err) {
    console.log(err);
    }
}

const getProductById = async (productId:string) => {
    const productRef = doc(db, "products", productId);
    const docSnap = await getDoc(productRef);
    
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.log("No such document!");
    }
}

const getSizeOfProducts = async() => {
    const productRef = collection(db, 'products');
    return await getCountFromServer(productRef);
}

// TO LAZY
// const getQueryProductsWithLimit = async (query:string,limit:number) => {
// }

export { addProduct, editProduct, deleteProduct, getProductById, getSizeOfProducts };
