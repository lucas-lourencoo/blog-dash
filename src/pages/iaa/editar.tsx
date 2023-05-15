import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { FaPen } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { api } from "@/utils/api";
import { Loading } from "@/components/Loading";

interface CategoriesEditProps {
  posts: {
    id: string;
    title: string;
    content: string;
    images: string;
  }[];
}

export default function CategoriasEditar({ posts }: CategoriesEditProps) {
  const [postsArray, setPostsArray] = useState(posts);
  const [isLoading, setIsLoading] = useState(false);

  function deletePost(postId: string) {
    setIsLoading(true);

    api
      .delete(`/iaa/${postId}`)
      .then(() => {
        toast.success("Categoria excluída com sucesso!");
        const arrayFiltered = postsArray.filter((post) => post.id !== postId);

        setPostsArray(arrayFiltered);
      })
      .catch(() => toast.error("Ocorreu um erro ao excluir."))
      .finally(() => setIsLoading(false));
  }

  return (
    <DashboardLayout>
      <section>
        <h1>Categorias</h1>
        <h2>Editar uma categoria</h2>

        <div className="table">
          {isLoading && (
            <div className="wrapperLoad">
              <Loading size="7rem" width="16px" />
            </div>
          )}

          <table>
            <thead>
              <tr>
                <th></th>
                <th>Título</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {postsArray.map((post) => (
                <tr key={post.id}>
                  <td
                    style={{
                      maxWidth: ".75rem",
                    }}
                  >
                    <img
                      src={JSON.parse(post.images)[0]}
                      alt="Imagem da categoria"
                    />
                  </td>
                  <td>{post.title}</td>
                  <td>
                    <Link href={`/iaa/${post.id}`}>
                      <FaPen size={20} title="Editar" />
                    </Link>
                    <a>
                      <button onClick={() => deletePost(post.id)}>
                        <FiX
                          size={18}
                          title="Excluir"
                          strokeWidth={5}
                          color="#d83439"
                        />
                      </button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

  const posts = await prisma.postsIaa.findMany({
    select: {
      content: true,
      images: true,
      title: true,
      id: true,
    },
  });

  return {
    props: { posts },
  };
};
