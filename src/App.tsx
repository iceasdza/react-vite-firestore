import {  useCallback } from 'react'
import './App.css'
import { getMultipleImageDataURL, uploadMultipleProductImage } from './services/UploadService';

function App() {
  
  const handleChange = useCallback(async(event:Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files
    const dataList = await getMultipleImageDataURL(files);
    const urls = await uploadMultipleProductImage(dataList);
    console.debug(urls)
  },[])

  return (
    <>
        <input type='file' multiple onChange={handleChange}/>
    </>
  )
}

export default App
