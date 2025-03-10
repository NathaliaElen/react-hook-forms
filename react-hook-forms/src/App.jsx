import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import FormLogo from '../src/assets/form-logo.png'

import './App.css'

const schema = yup
  .object({
    name: yup.string().required('O nome é obrigatório!'),
    email: yup.string().email('Digite um e-mail válido, inclua o @').required('O E-mail é obrigatório!'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 dígitos!').required('A senha é obrigatória!'),
    confirmPassword: yup.string().required('A confirmação de senha é obrigatória!').oneOf([yup.ref("password")], 'As senhas devem ser iguais!'),
  })
  .required()

function App() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  console.log(watch("name"))

  // Toda vez que o usuário submeter o form, vamos chamar a função onSubmit
  const onSubmit = (useData) => {
    console.log(useData);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
          <img src={FormLogo} alt="Logo Form" />

          <label>
            Nome: 
            <input type="text" {...register("name", { required: true })}/>
            {errors.name && <span>{errors.name?.message}</span>}
          </label>

          <label>
            E-mail: 
            <input type="email" {...register("email", { required: true })}/>
            <span>{errors.email?.message}</span>
          </label>

          <label>
            Senha: 
            <input type="password" {...register("password", { required: true })}/>
            <span>{errors.password?.message}</span>
          </label>

          <label>
            Confirmar Senha: 
            <input type="password" {...register("confirmPassword", { required: true })}/>
            <span>{errors.confirmPassword?.message}</span>
          </label>
          
          <button type='submit'>Cadastrar-se</button>
      </form>
    </>
  )
}

export default App
