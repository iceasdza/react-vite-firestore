import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getMultipleImageDataURL } from "../services/UploadService";
import DeleteIcon from "@mui/icons-material/Delete";
import { generateUUID } from "../utils/generator";
import { CAR_BRAND, PART } from "../constant/productsList";
import { CustomAutoCompleteField } from "./customAutoComplete";

interface ImageSet {
  src: string;
  id: string;
}

const ProductForm = () => {
  const [images, setImages] = useState<ImageSet[]>([]);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = useCallback((e) => {
    console.debug(e);
  }, []);

  const handleUploadLocalImages = useCallback(async (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const files = target.files;
    const dataList: Array<ImageSet> = (
      await getMultipleImageDataURL(files)
    ).map((file) => ({
      src: file,
      id: generateUUID(),
    }));
    setImages((prev) => [...prev, ...dataList]);
    event.target.value = null;
  }, []);

  const handleRemoveLocalImage = useCallback((selectedImage: ImageSet) => {
    setImages((prev) => {
      prev = prev.filter((image) => image.id !== selectedImage.id);
      return [...prev];
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "700px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: { value: true, message: "Please input product name!" },
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Product name"
                {...field}
                error={!!errors.name}
                helperText={`${errors?.name?.message || ""}`}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="description"
            rules={{
              required: {
                value: true,
                message: "Please input product description!",
              },
            }}
            render={({ field }) => (
              <TextField
                multiline
                fullWidth
                label="Product description"
                {...field}
                error={!!errors.description}
                helperText={`${errors?.description?.message || ""}`}
                minRows={4}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="images"
            render={({ field }) => (
              <input
                {...field}
                type="file"
                multiple
                onChange={handleUploadLocalImages}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <ImageList
            sx={{ width: "100%", height: 300 }}
            cols={3}
            rowHeight={164}
          >
            {images.map((item) => (
              <ImageListItem key={item.id}>
                <img
                  src={`${item.src}`}
                  srcSet={`${item.src}`}
                  alt={"uploaded image"}
                  loading="lazy"
                />
                <ImageListItemBar
                  sx={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                  }}
                  position="top"
                  actionIcon={
                    <IconButton
                      onClick={() => handleRemoveLocalImage(item)}
                      sx={{ color: "white" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  actionPosition="left"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="price"
            rules={{
              min: {
                message: "Please input more than 0",
                value: 0,
              },
              required: {
                value: true,
                message: "Please input product price!",
              },
            }}
            render={({ field }) => (
              <TextField
                type="number"
                fullWidth
                label="Product price"
                {...field}
                error={!!errors.price}
                helperText={`${errors?.price?.message || ""}`}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="quantityInPack"
            rules={{
              min: {
                message: "Please input more than 0",
                value: 0,
              },
              required: {
                value: true,
                message: "Please input product quantity per pack!",
              },
            }}
            render={({ field }) => (
              <TextField
                defaultValue={1}
                fullWidth
                label="Product quantityInPack"
                {...field}
                error={!!errors.quantityInPack}
                helperText={`${errors?.quantityInPack?.message || ""}`}
                minRows={4}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomAutoCompleteField
            options={CAR_BRAND}
            control={control}
            name="carModel"
            placeholder="Car Model"
          />
        </Grid>
        <Grid item xs={6}>
          <CustomAutoCompleteField
            options={PART}
            control={control}
            name="partName"
            placeholder="Car part"
          />
        </Grid>
      </Grid>
      <Button variant="outlined" type="submit">SUBMIT</Button>
    </form>
  );
};
export default ProductForm;
