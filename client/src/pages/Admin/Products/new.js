import React from "react";
import {
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { message } from "antd";
import { Formik, FieldArray } from "formik";
import { postProduct } from "../../../api";
import { useMutation, useQueryClient } from "react-query";

const NewProduct = () => {
  const queryClient = useQueryClient();
  const newProductsMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const handleSubmit = (values, bag) => {
    console.log(values);
    message.loading({ content: "Loading...", key: "product_new" });

    // values.photos = JSON.stringify(values.photos);

    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };

    newProductsMutation.mutate(newValues, {
      onSuccess: () => {
        console.log("success");
        message.success({
          content: "Add product successfully",
          key: "product_new",
          duration: 2,
        });
      },
    });
  };
  return (
    <div>
      <Text fontSize="2xl">New Product</Text>
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          photos: [],
        }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <Box>
              <Box>
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>description</FormLabel>
                    <Textarea
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>price</FormLabel>
                    <Input
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Photos</FormLabel>
                    <FieldArray
                      name="photos"
                      render={(arrayHelpers) => (
                        <div>
                          {values.photos &&
                            values.photos.map((photo, index) => (
                              <div key={index}>
                                <Input
                                  name={`photos.${index}`}
                                  onChange={handleChange}
                                  width="3xl"
                                  disabled={isSubmitting}
                                  value={photo}
                                />
                                <Button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          <Button onClick={() => arrayHelpers.push("")}>
                            Add a Photo
                          </Button>
                        </div>
                      )}
                    ></FieldArray>
                  </FormControl>
                  <Button type="submit" isLoading={isSubmitting}>
                    Save
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

export default NewProduct;
