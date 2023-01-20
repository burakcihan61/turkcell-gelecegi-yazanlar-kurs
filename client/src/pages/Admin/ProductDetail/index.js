import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../../../api";
import { FieldArray, Formik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import validationSchema from "./validations";
import { message } from "antd";

const AdminProductDetail = () => {
  const { product_id } = useParams();
  const { isLoading, isError, data, error } = useQuery(
    ["admin:product", product_id],
    () => fetchProduct(product_id)
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const handleSubmit = async (values, bag) => {
    console.log("submit");
    message.loading({ content: "Loading...", key: "product_update" });

    try {
      await updateProduct(values, product_id);
      message.success({
        content: "Error updating product",
        key: "product_update",
        duration: 2,
      });
    } catch (error) {
      message.error("The product doesnt product");
    }
  };
  return (
    <div>
      <Text fontSize="2xl">Edit</Text>
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleChange,
          values,
          isSubmitting,
          handleBlur,
        }) => (
          <>
            <Box>
              <Box margin={5} textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel fontSize="2xl">Title</FormLabel>
                    <Input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                    />
                    {touched.title && errors.title && (
                      <Text color="red">{errors.title}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="2xl">Description</FormLabel>
                    <Textarea
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                      isInvalid={touched.description && errors.description}
                    />
                    {touched.description && errors.description && (
                      <Text color="red">{errors.description}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="2xl">Price</FormLabel>
                    <Input
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                      isInvalid={touched.price && errors.price}
                    />
                    {touched.price && errors.price && (
                      <Text color="red">{errors.price}</Text>
                    )}
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel fontSize="2xl">Photos</FormLabel>
                    <FieldArray
                      name="photos"
                      render={(arrayHelpers) => (
                        <div>
                          {values.photos &&
                            values.photos.map((photo, index) => (
                              <div key={index}>
                                <Input
                                  name={`photos.${index}`}
                                  value={photo}
                                  disabled={isSubmitting}
                                  onChange={handleChange}
                                  width="3xl"
                                />
                                <Button
                                  ml={4}
                                  type="button"
                                  colorScheme="red"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          <Button mt={5} onClick={() => arrayHelpers.push("")}>
                            Add a photo
                          </Button>
                        </div>
                      )}
                    />
                  </FormControl>
                  <Button
                    mt={4}
                    width="full"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Update
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
};

export default AdminProductDetail;
