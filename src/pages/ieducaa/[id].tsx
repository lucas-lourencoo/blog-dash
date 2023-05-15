import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { useRouter } from "next/router";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { api } from "@/utils/api";
import { Button, DropzoneContainer } from "@/layouts/styles";

const schema = yup
  .object({
    title: yup.string().required("Campo obrigatório"),
    content: yup
      .string()
      .min(30, "Escreva uma descrição de, no mínimo, 30 caracteres.")
      .required("Campo obrigatório"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

interface CategoriesInterface {
  post: {
    id: string;
    title: string;
    content: string;
    images: string[];
  };
}

export default function Categorias({ post }: CategoriesInterface) {
  const { push } = useRouter();

  const [fileUrls, setFileUrls] = useState<string[]>(post.images);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onDropAccepted = <T extends File>(files: T[]) => {
    setFiles(files);

    files.map(async (file) => {
      await api
        .post(
          "/save_image",
          { file },
          {
            headers: {
              "Content-Type": `multipart/form-data;`,
            },
            onUploadProgress: (e) => {
              const progress = Math.round((e.loaded * 100) / e.total!);

              setProgressValue(progress);
            },
          }
        )
        .then(({ data }) => {
          setFileUrls((oldState) => [...oldState, data.file]);
        })
        .catch(() => {
          toast.error("Ocorreu um erro ao cadastrar a imagem");
        });
    });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!fileUrls) {
      toast.error("É obrigatório cadastrar ao menos uma imagem.");
      return;
    }

    setIsLoading(true);

    const newData = {
      title: data.title,
      images: fileUrls,
      id: post.id,
    };

    api
      .patch("/ieducaa", newData)
      .then((res) => {
        toast.success("Alterado com sucesso!");
        setFileUrls([]);
        setFiles([]);
        reset();
        push("/iaa/editar");
      })
      .catch((err) => {
        toast.error("Ocorreu um erro ao atualizar.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <DashboardLayout>
      <section>
        <h1>Blog IAA</h1>
        <h2>Editar um post</h2>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputControl">
            <label htmlFor="title">Título</label>
            <input
              placeholder="Título"
              className={errors.title && "errorInput"}
              {...register("title")}
              defaultValue={post.title}
            />
            {errors.title && <p>{errors.title?.message}</p>}
          </div>

          <div className="inputControl">
            <label htmlFor="content">Conteúdo</label>
            <textarea
              placeholder="Digite o conteúdo do post..."
              {...register("content")}
              rows={8}
              defaultValue={post.content}
            ></textarea>
            {errors.content && <p>{errors.content?.message}</p>}
          </div>

          <div className="inputControl images">
            <label htmlFor="value">Imagem</label>
            <Dropzone
              accept={{ "image/*": [".png", ".jpeg", ".jpg"] }}
              onDropAccepted={onDropAccepted}
              maxFiles={8}
              maxSize={5242880}
            >
              {({
                getRootProps,
                getInputProps,
                isDragReject,
                isDragAccept,
              }) => (
                <DropzoneContainer
                  {...getRootProps()}
                  style={
                    isDragReject
                      ? { border: "2px dashed var(--red)" }
                      : isDragAccept
                      ? { border: "2px dashed #4ec96b" }
                      : {}
                  }
                >
                  <input {...getInputProps()} />
                  <span
                    style={
                      isDragReject
                        ? { color: "var(--red)" }
                        : isDragAccept
                        ? { color: " #4ec96b" }
                        : {}
                    }
                  >
                    Arraste a imagem, ou clique para selecionar
                  </span>
                </DropzoneContainer>
              )}
            </Dropzone>

            {files?.length > 0 && (
              <div className="archivesList">
                <ul>
                  <li>
                    <div className="leftSide">
                      <div className="imageWrapper">
                        <Image
                          src={URL.createObjectURL(files[0])}
                          alt=""
                          width={80}
                          height={80}
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      <span>{files[0].name}</span>
                    </div>

                    <div style={{ height: "2rem", width: "2rem" }}>
                      <CircularProgressbar
                        value={progressValue}
                        strokeWidth={15}
                        styles={buildStyles({
                          pathColor: "#db542b",
                          trailColor: "#fff",
                        })}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <Button
            style={
              isLoading
                ? { cursor: "not-allowed", filter: "brightness(80%)" }
                : {}
            }
          >
            Cadastrar
          </Button>
        </form>
      </section>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const prisma = new PrismaClient();
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });

  if (!user || !user.administrator || !session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const post = await prisma.postsIeducaa.findFirst({
    where: {
      id: ctx.params?.id?.toString(),
    },
    select: {
      content: true,
      images: true,
      title: true,
      id: true,
    },
  });

  return {
    props: { post },
  };
};
