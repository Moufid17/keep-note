import { HexColorPicker } from "react-colorful";

function ColorPicker({value, onChange}: { value?: string, onChange: (color: string) => void }) {
    return (
      <HexColorPicker color={value} onChange={onChange} />
    )
}

export default ColorPicker