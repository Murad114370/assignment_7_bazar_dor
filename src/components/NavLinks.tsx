import Link from "next/link";

interface Navs {
      id: string,
    slug: string,
    nameBn: string,
    icon: string
}


const NavLinks = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories")
    const data: Navs[] = await res.json()
    // console.log(data);
    return (
        <div className="flex gap-7 mt-5">
            {
                data.map((n, i) => <Link key={i} href={n.slug} >{n.icon}  {n.nameBn}</Link>)
            }
        </div>
    );
};

export default NavLinks;