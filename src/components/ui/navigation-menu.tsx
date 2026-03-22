"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

import { cn } from "@/lib/utils";

/* ---------------- ROOT ---------------- */
function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      delayDuration={0} // no flicker
      className={cn(
        "group/navigation-menu relative flex items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

/* ---------------- LIST ---------------- */
function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "flex flex-1 list-none items-center justify-center gap-2",
        className
      )}
      {...props}
    />
  );
}

/* ---------------- ITEM ---------------- */
function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

/* ---------------- TRIGGER ---------------- */
const navigationMenuTriggerStyle = cva(
  "inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none"
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className="ml-1 size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

/* ---------------- CONTENT (FIXED) ---------------- */
function NavigationMenuContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "absolute top-full left-0 mt-2 w-auto min-w-[16rem] max-w-[90vw]", // ✅ responsive width
        "flex flex-col gap-2 p-4 rounded-md border bg-popover text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "transition-opacity duration-200",
        "whitespace-normal break-normal",
        className
      )}
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Content>
  );
}

/* ---------------- VIEWPORT (FIXED) ---------------- */
function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className="absolute top-full left-0 z-50 flex justify-center w-full">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "mt-2 w-auto min-w-[16rem] max-w-[90vw]", // ✅ matches content width
          "overflow-hidden rounded-md border bg-popover shadow-md",
          "transition-opacity duration-200",
          className
        )}
        {...props}
      />
    </div>
  );
}

/* ---------------- LINK ---------------- */
function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "block px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground whitespace-normal break-normal",
        className
      )}
      {...props}
    />
  );
}

/* ---------------- INDICATOR ---------------- */
function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center",
        className
      )}
      {...props}
    >
      <div className="h-2 w-2 rotate-45 bg-border shadow-sm" />
    </NavigationMenuPrimitive.Indicator>
  );
}

/* ---------------- EXPORTS ---------------- */
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};