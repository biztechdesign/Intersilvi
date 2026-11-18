/** Concept B icon set: authored SVG, 24px grid, 1.5px stroke, round caps. */

export type IconName =
  | "search"
  | "user"
  | "bag"
  | "menu"
  | "close"
  | "chevron-down"
  | "arrow-right"
  | "arrow-up-right"
  | "phone"
  | "mail"
  | "globe"
  | "list"
  | "chat"
  | "pin"
  | "heart"
  | "pen"
  | "box"
  | "truck";

const PATHS: Record<IconName, string> = {
  search: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM15.3 15.3 20 20",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20c.9-3.5 3.9-5.5 7.5-5.5s6.6 2 7.5 5.5",
  bag: "M5 8h14l-1 12H6L5 8ZM9 8V6.5a3 3 0 0 1 6 0V8",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  "chevron-down": "M6 9.5l6 6 6-6",
  "arrow-right": "M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5",
  "arrow-up-right": "M7 17 17 7M8.5 7H17v8.5",
  phone:
    "M6.5 4h3l1.5 4-2 1.25a9.5 9.5 0 0 0 5.75 5.75L16 13l4 1.5v3A2 2 0 0 1 18 19.5C10.5 19 5 13.5 4.5 6A2 2 0 0 1 6.5 4Z",
  mail: "M4 6.5h16v11H4v-11ZM4.5 7l7.5 6 7.5-6",
  globe:
    "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17ZM3.5 12h17M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.1-3.3-8.5S9.8 5.8 12 3.5Z",
  list: "M9 7h11M9 12h11M9 17h11M4.5 7h.01M4.5 12h.01M4.5 17h.01",
  chat: "M5 5.5h14v10H10l-4 3.5v-3.5H5v-10Z",
  pin: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  heart:
    "M12 19.5s-7.5-4.4-7.5-9.7A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5c0 5.3-7.5 9.7-7.5 9.7Z",
  pen: "M4.5 19.5 5.5 15 15.5 5a2.1 2.1 0 0 1 3 3l-10 10-4 1.5ZM13.5 7l3 3",
  box: "M4 7.5 12 4l8 3.5v9L12 20l-8-3.5v-9ZM4 7.5l8 3.5 8-3.5M12 11v9",
  truck: "M3.5 6.5h10.5v9H3.5v-9ZM14 9.5h3.5l3 3v3H14M7 18.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM17 18.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z",
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
