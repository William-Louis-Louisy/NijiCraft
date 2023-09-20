export interface IPaletteColorItemProps {
  color: string;
  onEdit?: (color: string) => void;
  onDelete: (color: string) => void;
}
