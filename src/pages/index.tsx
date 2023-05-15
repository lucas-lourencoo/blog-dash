import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { DashboardLayout } from "@/layouts/DashboardLayout";

export default function Home() {
  const { data: session } = useSession();

  return (
    <DashboardLayout>
      <section>
        <h1>Dashboard</h1>
        <h2>Painel de gerenciamento</h2>

        <h3>Seja bem vindo(a), {session?.user?.name?.split(" ")[0]}!</h3>
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

  return {
    props: {},
  };
};
