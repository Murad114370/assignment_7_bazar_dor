import Link from "next/link";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  let categories: Navs[] = [];

  try {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
      cache: "no-store",
    });
    const data = await res.json();

    // Safely extract the array whether it's wrapped or direct
    categories = Array.isArray(data) ? data : data.data || data.categories || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  // Define Home category item
  const homeCategory: Navs = {
    id: "home",
    slug: "",
    nameBn: "হোম",
    icon: "🏠",
  };

  // Prepend Home to the categories array safely
  const allNavLinks = [homeCategory, ...categories];

  return (
    <div className="max-w-7xl mx-auto flex gap-7 mt-5 overflow-x-auto pb-2">
      {allNavLinks.map((n) => {
        const href = n.slug === "" ? "/" : `/${n.slug}`;

        return (
          <Link 
            key={n.id || n.slug} 
            href={href}
            className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors font-medium whitespace-nowrap"
          >
            <span>{n.icon}</span>
            <span>{n.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;