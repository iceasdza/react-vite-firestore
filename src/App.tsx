import { useCallback, useState, useEffect, useMemo } from "react";
import "./App.css";
import {
  getMultipleImageDataURL,
  uploadMultipleProductImage,
} from "./services/UploadService";
import { useForm } from "react-hook-form";
import {
  addProduct,
  getDataFromDocumentSnapshots,
  getQueryProductsWithLimit,
  getSizeOfProducts,
} from "./services/ProductService";
import { Pagination } from "@mui/material";
import ProductForm from "./components/productForm";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [products, setProducts] = useState([]);
  const [snapshot,setSnapshot] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0)
  const [page, setPage] = useState(1);

  const onSubmit = async (data: any) => {
    console.debug(data);
    await addProduct({ ...data, create_at: Date.now() });
  };
  const handleChange = useCallback(async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    const dataList = await getMultipleImageDataURL(files);
    const urls = await uploadMultipleProductImage(dataList);
    console.debug(urls);
  }, []);

  const handleGetProducts = async () => {
    const a = await getSizeOfProducts();
  };

  const getData = useCallback(
    async (currentPage) => {
      const totalProduct = await getSizeOfProducts();
      const document = await getQueryProductsWithLimit(currentPage, 2);
      setTotalProduct(Math.round(totalProduct/2))
      setSnapshot(document)
      setProducts(getDataFromDocumentSnapshots([...document]));
    },
    [setProducts]
  );

  const handleChangePage = useCallback(async (nextPage:number) => {
    getData(nextPage)
    setPage(nextPage);
  }, []);

  useEffect(() => {
    getData(3);
    handleGetProducts;
  }, [getData]);

  const handleDelete = useCallback(async (id: any) => {
    // await deleteProduct(id)
  }, []);

  return (
    <>
    <ProductForm/>
      {/* <input type="file" multiple onChange={handleChange} />
      <button onClick={handleGetProducts}>GET PRODUCTS</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="test" {...register("example")} />
        <input {...register("exampleRequired", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" />
      </form>
      <h1>DATA TOTAL : {totalProduct}</h1>
      
      <Pagination count={totalProduct} page={page} onChange={(_,nextPage) => handleChangePage(nextPage)} shape="rounded" />
      {products.map((data) => (
        <p key={data?.id} onClick={handleDelete}>
          ITEMS : {data.example}
        </p>
      ))} */}
    </>
  );
}

export default App;
