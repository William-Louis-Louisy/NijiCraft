export interface IPaletteColorItemProps {
  color: string;
  onEdit: Function;
  onDelete: (color: string) => void;
}
