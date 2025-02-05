import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createTaskSchema, updateTaskSchema } from '@/schemas/task';
import { CreateTaskFormData, UpdateTaskFormData } from '@/types/task';

type TaskFormFieldsHookProps = {
  defaultValues: CreateTaskFormData | UpdateTaskFormData;
  mode: 'create' | 'edit';
};

/**
 * useTaskFormFields Hook
 *
 * This custom React Hook simplifies task form management by integrating
 * `react-hook-form` with Zod validation for both task creation and editing.
 *
 * Functionality:
 * - Initializes the form with default values.
 * - Applies the appropriate validation schema (`createTaskSchema` or `updateTaskSchema`).
 * - Provides form utilities like `register`, `handleSubmit`, `reset`, and `setFocus`.
 * - Exposes form state, including validation errors and submission status.
 *
 * Parameters:
 * - `defaultValues`: The initial values for the form.
 * - `mode`: Determines whether the form is in "create" or "edit" mode.
 *
 * Returns:
 * - `control`: Control object for managing form fields.
 * - `register`: Registers form fields for `react-hook-form`.
 * - `handleSubmit`: Handles form submission.
 * - `reset`: Resets the form fields.
 * - `setFocus`: Sets focus on a specific field.
 * - `errors`: Contains validation errors.
 * - `isSubmitting`: Boolean indicating if the form is being submitted.
 */
export const useTaskFormFields = ({
  defaultValues,
  mode,
}: TaskFormFieldsHookProps) => {
  const { control, register, handleSubmit, reset, setFocus, formState } =
    useForm<CreateTaskFormData | UpdateTaskFormData>({
      resolver: zodResolver(
        mode === 'create' ? createTaskSchema : updateTaskSchema
      ),
      defaultValues,
    });

  return {
    control,
    register,
    handleSubmit,
    reset,
    setFocus,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
  };
};
