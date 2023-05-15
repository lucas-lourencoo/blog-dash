import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, LinkActivable } from "./styles";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { RefObject, useRef } from "react";
import { signOut } from "next-auth/react";

export function Sidebar() {
  const router = useRouter();
  const categorySubmenu = useRef<HTMLUListElement>(null);
  const colorSubmenu = useRef<HTMLUListElement>(null);

  function showSubmenu(ref: RefObject<HTMLUListElement>) {
    if (ref.current?.style.display === "none")
      ref.current.style.display = "block";
    else ref.current!.style.display = "none";
  }

  return (
    <Container>
      <Link href={"/"}>
        <Image src="/logo-maju.png" alt="verano" width={170} height={110} />
      </Link>

      <ul>
        <li>
          <LinkActivable
            css={
              router.asPath == "/ieducaa/adicionar" ||
              router.asPath == "/ieducaa/editar"
                ? {
                    background: "rgba(38, 122, 220, 0.05)",
                    color: "#267adc !important",
                    "svg path": { fill: "#267adc" },
                  }
                : {}
            }
            onClick={() => showSubmenu(categorySubmenu)}
          >
            <div className="leftSide">
              <span>IEDUCAA</span>
            </div>

            <FiChevronDown />
          </LinkActivable>

          <ul className="submenu" ref={categorySubmenu}>
            <li>
              <Link href={"/ieducaa/adicionar"}>Adicionar novo post</Link>
              <Link href={"/ieducaa/editar"}>Editar posts</Link>
            </li>
          </ul>
        </li>

        <li>
          <LinkActivable
            css={
              router.asPath == "/iaa/adicionar" ||
              router.asPath == "/iaa/editar"
                ? {
                    background: "rgba(38, 122, 220, 0.05)",
                    color: "#267adc !important",
                    "svg path": { fill: "#267adc" },
                  }
                : {}
            }
            onClick={() => showSubmenu(colorSubmenu)}
          >
            <div className="leftSide">
              <span>IAA</span>
            </div>

            <FiChevronDown />
          </LinkActivable>

          <ul className="submenu" ref={colorSubmenu}>
            <li>
              <Link href={"/iaa/adicionar"}>Adicionar novo post</Link>
              <Link href={"/iaa/editar"}>Editar posts</Link>
            </li>
          </ul>
        </li>

        <li style={{ marginTop: "3rem" }}>
          <LinkActivable onClick={() => signOut()}>
            <div className="leftSide">
              <span>Sair</span>
            </div>

            <FiLogOut />
          </LinkActivable>
        </li>
      </ul>
    </Container>
  );
}
