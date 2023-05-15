import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Container } from "@/styles/pages/login";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Digite seu email"),
    password: yup
      .string()
      .min(8, "A senha tem no mínimo 8 caracteres")
      .required("Digite a senha"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);

    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setIsLoading(false);

    if (response?.error) {
      toast.error("Credenciais inválidas! Verifique e tente novamente.");
      return;
    }

    router.push("/");
  };

  function handlePasswordVisible() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <main>
      <Container>
        <div className="loginGrid">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <h3>Entre com seus dados para prosseguir</h3>

            <input
              placeholder="Email"
              {...register("email", { required: "Email é obrigatório" })}
              className={errors.email && "errorInput"}
            />
            {errors.email && <p>{errors.email?.message}</p>}

            <div className="inputFormControl">
              <input
                placeholder="Senha"
                type={isPasswordVisible ? "text" : "password"}
                className={errors.password && "errorInput"}
                {...register("password", {
                  required: "Obrigatório cadastrar uma senha",
                  minLength: 8,
                })}
              />
              <button
                type="button"
                className="passwordEye"
                onClick={handlePasswordVisible}
              >
                {isPasswordVisible ? (
                  <FiEye size={20} />
                ) : (
                  <FiEyeOff size={20} />
                )}
              </button>
              {errors.password && <p>{errors.password?.message}</p>}
            </div>

            <button
              type="submit"
              style={
                isLoading
                  ? { cursor: "not-allowed", filter: "brightness(80%)" }
                  : {}
              }
            >
              Entrar
            </button>
          </form>
        </div>
      </Container>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
