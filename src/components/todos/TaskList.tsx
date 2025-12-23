import type { Todo } from "@/types/todo";
import { TaskItem } from "@/components/todos/TaskItem";

type TaskListProps = {
  todos: Todo[];
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

export const TaskList = ({ todos, onToggle, onEdit, onDelete }: TaskListProps) => {
  if (todos.length === 0) {
    return (
      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-2)] px-6 py-10 text-center text-sm text-[var(--muted)]">
        Nenhuma tarefa encontrada. Crie a primeira e acompanhe seu progresso.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {todos.map((todo) => (
        <TaskItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
