// Convierte la urgencia en etiqueta y color
export interface UrgencyStyle {
  label: string;
  className: string;
}

const urgencyStyles: Record<string, UrgencyStyle> = {
  low: { label: 'Low urgency', className: 'bg-success-soft text-success' },
  normal: { label: 'Normal urgency', className: 'bg-warn-soft text-warn' },
  medium: { label: 'Medium urgency', className: 'bg-warn-soft text-warn' },
  high: { label: 'High urgency', className: 'bg-danger-soft text-danger' },
  immediate: { label: 'Reply soon', className: 'bg-danger-soft text-danger' },
};

export const urgencyFor = (value: unknown): UrgencyStyle | undefined =>
  value ? urgencyStyles[String(value).toLowerCase()] : undefined;
