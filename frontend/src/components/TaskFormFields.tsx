import { Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';

import { CreateTaskFormData, UpdateTaskFormData } from '@/types/task';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '@/utils/taskUtils';

type TaskFormFieldsProps = {
  control: Control<CreateTaskFormData | UpdateTaskFormData>;
  register: UseFormRegister<CreateTaskFormData | UpdateTaskFormData>;
  errors: FieldErrors<CreateTaskFormData | UpdateTaskFormData>;
};

/**
 * TaskFormFields Component
 *
 * This component provides form fields for creating and updating tasks.
 * - Uses `react-hook-form` for form handling and validation.
 * - Integrates Mantine components as form inputs.
 * - Supports controlled inputs for `status`, `priority`, and `dueDate` using `Controller`.
 */
export const TaskFormFields = ({
  control,
  register,
  errors,
}: TaskFormFieldsProps) => (
  <>
    {/* Title */}
    <TextInput
      label="Title"
      placeholder="Enter task title"
      {...register('title')}
      error={errors.title?.message}
      autoFocus
    />

    {/* Description */}
    <TextInput
      label="Description"
      placeholder="Enter task description"
      {...register('description')}
      error={errors.description?.message}
    />

    {/* Status */}
    <Controller
      name="status"
      control={control}
      render={({ field }) => (
        <Select
          label="Status"
          data={STATUS_OPTIONS}
          {...field}
          error={errors.status?.message}
          allowDeselect={false}
        />
      )}
    />

    {/* Priority */}
    <Controller
      name="priority"
      control={control}
      render={({ field }) => (
        <Select
          label="Priority"
          data={PRIORITY_OPTIONS}
          {...field}
          error={errors.priority?.message}
          allowDeselect={false}
        />
      )}
    />

    {/* Due Date */}
    <Controller
      name="dueDate"
      control={control}
      render={({ field }) => (
        <DateInput
          label="Due Date"
          value={field.value ? new Date(field.value) : null}
          onChange={(date) => field.onChange(date?.toISOString())}
          error={errors.dueDate?.message}
        />
      )}
    />
  </>
);
