import { Button } from "@/components/ui/Button";

type FilterValue = "all" | "active" | "completed";

type TaskFilterProps = {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
};

const options: Array<{ value: FilterValue; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Em aberto" },
  { value: "completed", label: "Concluidos" },
];

export const TaskFilter = ({ value, onChange }: TaskFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <Button
          key={option.value}
          type="button"
          variant={value === option.value ? "primary" : "outline"}
          size="sm"
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
