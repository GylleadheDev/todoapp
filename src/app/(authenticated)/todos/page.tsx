"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { showToast } from "nextjs-toast-notify";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TaskFilter } from "@/components/todos/TaskFilter";
import { TaskForm } from "@/components/todos/TaskForm";
import { TaskList } from "@/components/todos/TaskList";
import type { Todo } from "@/types/todo";

type FilterValue = "all" | "active" | "completed";

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterValue>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const isSavingRef = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      if (response.ok) {
        setTodos(data);
      } else {
        showToast.error(data.error ?? "Erro ao carregar tarefas", {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          icon: "",
          sound: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }, [filter, todos]);

  const handleCreate = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: { title: string; description?: string }) => {
    if (isSavingRef.current) return;
    isSavingRef.current = true;
    setIsSaving(true);
    try {
      const response = await fetch(
        editingTodo ? `/api/todos/${editingTodo.id}` : "/api/todos",
        {
          method: editingTodo ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (response.ok) {
        showToast.success(
          editingTodo ? "Tarefa atualizada!" : "Tarefa criada!",
          {
            duration: 2000,
            progress: true,
            position: "top-center",
            transition: "bounceIn",
            icon: "",
            sound: true,
          }
        );
        setIsModalOpen(false);
        setEditingTodo(null);
        fetchTodos();
      } else {
        showToast.error(data.error ?? "Erro ao salvar tarefa", {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          icon: "",
          sound: true,
        });
      }
    } finally {
      setIsSaving(false);
      isSavingRef.current = false;
    }
  };

  const handleToggle = async (todo: Todo) => {
    const response = await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    if (response.ok) {
      fetchTodos();
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleDelete = async (todo: Todo) => {
    const response = await fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchTodos();
    }
  };

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-6 rounded-[2rem] border border-[var(--border)] bg-[var(--surface-2)] px-6 py-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
            tarefas do time
          </p>
          <h1 className="text-3xl font-semibold text-[var(--ink)]">
            Central de tarefas
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Planeje, acompanhe e finalize com clareza.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={fetchTodos}>
            Atualizar
          </Button>
          <Button onClick={handleCreate}>Nova tarefa</Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <TaskFilter value={filter} onChange={setFilter} />
        <div className="text-sm text-[var(--muted)]">
          {todos.length} tarefas no total
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-center text-sm text-[var(--muted)]">
          Carregando tarefas...
        </div>
      ) : (
        <TaskList
          todos={filteredTodos}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTodo(null);
        }}
        title={editingTodo ? "Editar tarefa" : "Nova tarefa"}
      >
        <TaskForm
          initialValues={
            editingTodo
              ? {
                  title: editingTodo.title,
                  description: editingTodo.description ?? "",
                }
              : undefined
          }
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingTodo(null);
          }}
          isSubmitting={isSaving}
          submitLabel={editingTodo ? "Atualizar" : "Criar"}
        />
      </Modal>
    </section>
  );
}
