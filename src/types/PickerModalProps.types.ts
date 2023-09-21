export interface IPickerModalProps {
  lang: string;
  addColor: Function;
  pickerRef: any;
  pickerType: string;
  inputValue: string;
  modalVisible: boolean;
  setPickerType: (type: string) => void;
  onSelectColor: any;
  setInputValue: (value: string) => void;
  setModalVisible: (visible: boolean) => void;
  selectedColor: any;
  selectedColorHex: string;
  setSelectedColorHex: (hex: string) => void;
  handleHexInputEndEditing: any;
  setSelectedColor: (color: any) => void;
}
