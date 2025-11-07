import React from "react";
import Select from "react-select";

const CustomMultiSelect = React.forwardRef<
  React.ComponentRef<typeof Select>,
  React.ComponentPropsWithoutRef<typeof Select>
>((props, ref) => {
  return <Select ref={ref} {...props} />;
});

CustomMultiSelect.displayName = "CustomMultiSelect";

export default CustomMultiSelect;
