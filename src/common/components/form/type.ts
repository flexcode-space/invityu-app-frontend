export interface InputProps {
  name: string;
  type?: string;
  label?: string;
  note?: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  value?: string;
  isReadOnly?: true | false | undefined;
  useDatePicker?: boolean;
  required?: boolean;
  [key: string]: any;
}
