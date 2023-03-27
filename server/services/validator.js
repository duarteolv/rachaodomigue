const yup = require("yup");

const REQUIRED_FIELD_MESSAGE = "Campo Obrigatório.";

module.exports =  yup.object({
  name: yup.string().required(REQUIRED_FIELD_MESSAGE),
  surname: yup.string().required(REQUIRED_FIELD_MESSAGE),
  message: yup.string().required(REQUIRED_FIELD_MESSAGE),
  email: yup.string().required(REQUIRED_FIELD_MESSAGE).email(),
});
