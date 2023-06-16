import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  updateDoc,
  query,
  limit,
  orderBy,
  getDocs,
  startAfter,
  startAt,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

const addProduct = async (payload: any) => {
  try {
    await addDoc(collection(db, "products"), payload);
  } catch (err) {}
};

const editProduct = async (productId: string, payload: any) => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, payload);
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (productId: string) => {
  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
  } catch (err) {
    console.log(err);
  }
};

const getProductById = async (productId: string) => {
  const productRef = doc(db, "products", productId);
  const docSnap = await getDoc(productRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

const getSizeOfProducts = async () => {
  const productRef = collection(db, "products");
  return (await getCountFromServer(productRef)).data().count;
};

const getDataFromDocumentSnapshots = (documentSnapshots: any) => {
  return documentSnapshots.map((snapshot: any) => ({
    ...snapshot.data(),
    id: snapshot.id,
  }));
};

const getQueryProductsWithLimit = async (
  snapshot: number,
  limitePage: number
) => {
  const first = query(
    collection(db, "products"),
    orderBy("create_at"),
    startAt(snapshot || 0),
    limit(limitePage)
  );
  const documentSnapshots = (await getDocs(first)).docs;
  return documentSnapshots;
};

export {
  addProduct,
  editProduct,
  deleteProduct,
  getProductById,
  getSizeOfProducts,
  getQueryProductsWithLimit,
  getDataFromDocumentSnapshots,
};
