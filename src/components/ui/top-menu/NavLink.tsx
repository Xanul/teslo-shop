import Link from "next/link"

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

export const NavLink = ({href, children}: NavLinkProps) => {
    return (
        <Link href={href} className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
            {children}
        </Link>
    )

}