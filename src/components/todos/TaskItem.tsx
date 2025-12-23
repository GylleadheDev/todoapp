import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Todo } from "@/types/todo";

type TaskItemProps = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

export const TaskItem = ({ todo, onToggle, onEdit, onDelete }: TaskItemProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
          className="mt-1 h-4 w-4 rounded border-[var(--border)] text-[var(--accent)]"
        />
        <div>
          <p
            className={`text-sm font-semibold ${
              todo.completed ? "text-[var(--muted)] line-through" : "text-[var(--ink)]"
            }`}
          >
            {todo.title}
          </p>
          {todo.description && (
            <p className="mt-1 text-xs text-[var(--muted)]">
              {todo.description}
            </p>
          )}
        </div>
      </label>
      <div className="flex flex-wrap gap-2 sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onEdit(todo)}
          className="gap-2"
        >
          <Pencil className="h-4 w-4" />
          Editar
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onDelete(todo)}
          className="gap-2 text-red-500 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
          Remover
        </Button>
      </div>
    </div>
  );
};
