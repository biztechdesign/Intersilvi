/**
 * Design-system icon set: Material Symbols Rounded only, light weight (wght 300), outlined, 24px optical size.
 * Never mix in another icon family or a custom SVG. Decorative by default.
 * The font is loaded once in src/app/layout.tsx; an icon is a ligature, so its name is the Material Symbols name.
 */

const SYMBOLS = {
  search: "search",
  user: "person",
  bag: "shopping_bag",
  menu: "menu",
  close: "close",
  "chevron-down": "expand_more",
  "chevron-up": "expand_less",
  "chevron-left": "chevron_left",
  "chevron-right": "chevron_right",
  "arrow-right": "arrow_forward",
  "arrow-up-right": "arrow_outward",
  check: "check",
  plus: "add",
  minus: "remove",
  trophy: "emoji_events",
  hand: "back_hand",
  pin: "location_on",
  heart: "favorite",
  upload: "upload",
  info: "info",
  alert: "warning",
  "check-circle": "check_circle",
  "x-circle": "cancel",
  globe: "language",
  list: "format_list_bulleted",
  phone: "call",
  mail: "mail",
  filter: "tune",
  trash: "delete",
  truck: "local_shipping",
  box: "inventory_2",
  pen: "edit",
  "zoom-in": "zoom_in",
  "zoom-out": "zoom_out",
  rotate: "rotate_right",
  facebook: "group",
  instagram: "photo_camera",
  youtube: "play_circle",
  clock: "schedule",
  chat: "chat_bubble",
  image: "image",
  eye: "visibility",
  "eye-off": "visibility_off",
} as const;

export type IconName = keyof typeof SYMBOLS;

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  /** Give the icon an accessible name only when it stands alone without visible text. */
  label?: string;
}

export function Icon({ name, size = 20, className, label }: IconProps) {
  return (
    <span
      className={`ds-icon ${className ?? ""}`}
      style={{ width: size, height: size, fontSize: size }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {SYMBOLS[name]}
    </span>
  );
}
