import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon, X } from "lucide-react";
import { useEffect, useState, memo } from "react";

type CustomGlobalFilterType = {
  value: string;
  onChange: (value: string) => void;
  clearFilter: () => void;
};

function CustomGlobalFilter({
  onChange: customChange,
  value,
  clearFilter,
}: CustomGlobalFilterType) {
  const [globalValue, setGlobalValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      customChange(globalValue);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [globalValue, customChange]);

  return (
    <InputGroup className="relative max-w-xs">
      <InputGroupInput
        value={globalValue}
        onChange={(e) => setGlobalValue(e.target.value)}
        placeholder="Arama..."
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      {globalValue && (
        <X
          className="text-muted-foreground absolute top-[50%] right-2 z-20 size-5 -translate-y-1/2 cursor-pointer"
          onClick={() => {
            setGlobalValue("");
            clearFilter();
          }}
        />
      )}
    </InputGroup>
  );
}
export default memo(CustomGlobalFilter);
