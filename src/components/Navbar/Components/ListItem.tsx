import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import Link from "next/link";

export function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="group flex flex-col gap-1 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-white/6"
          style={{ border: "1px solid transparent" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(28,77,141,0.35)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "transparent";
          }}
        >
          <div className="font-medium text-white/85 group-hover:text-white transition-colors leading-none">
            {title}
          </div>
          {children && (
            <div className="line-clamp-2 text-xs text-white/40 group-hover:text-white/55 transition-colors leading-relaxed">
              {children}
            </div>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
