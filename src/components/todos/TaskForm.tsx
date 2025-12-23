"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type TaskFormValues = {
  title: string;
  description?: string;
};

type TaskFormProps = {
  initialValues?: TaskFormValues;
  onSubmit: (values: TaskFormValues) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
};

export const TaskForm = ({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel = "Salvar",
}: TaskFormProps) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );

  useEffect(() => {
    setTitle(initialValues?.title ?? "");
    setDescription(initialValues?.description ?? "");
  }, [initialValues?.description, initialValues?.title]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (isSubmitting) return;
        onSubmit({ title, description });
      }}
      className="space-y-5"
    >
      <Input
        label="Titulo"
        placeholder="Ex: Revisar backlog"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <Textarea
        label="Descricao"
        placeholder="Contexto, links ou detalhes importantes"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        rows={4}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : submitLabel}
        </Button>
      </div>
    </form>
  );
};
