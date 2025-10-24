import { titleFont } from "@/config/fonts";
import Image from "next/image";
import Link from "next/link";

export const PageNotFound = () => {
  return (
    <div
      className={
        "flex flex-col-reverse md:flex-row h-[calc(100vh-4rem)] w-full justify-center items-center"
      }
    >
      <div className={"text-center px-5"}>
        <h1 className={`${titleFont.className} text-7xl md:text-9xl font-bold`}>404</h1>
        <p className={"font-semibold text-lg md:text-xl"}>
          Whoops! Sorry, but this page does not exist.
        </p>
        <p className={"font-light"}>
          <span>You can go back to: </span>
          <Link
            href="/"
            className={"font-normal hover:underline underline-offset-2"}
          >
            Home
          </Link>
        </p>
      </div>
      <div className={"px-5 max-w-lg -mt-20 md:mt-0"}>
        <Image
          src="/imgs/starman_750x750.png"
          alt="Starman"
          className={"sm:p-0"}
          width={550}
          height={550}
        />
      </div>
    </div>
  );
};
