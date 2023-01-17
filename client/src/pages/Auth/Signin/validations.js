import * as yup from "yup";

const validations = yup.object().shape({
  email: yup.string().email("Geçerli bir email giriniz").required(),
  password: yup
    .string()
    .min(5, "Parolanız en az 5 karakter olmalıdır")
    .required(),
});

export default validations;
