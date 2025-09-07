import type { z } from 'zod';

// Recursively collect dot-path field names from a values object
export function collectFieldNames(values: unknown, base: string = ''): string[] {
  const names: string[] = [];
  if (values === null || values === undefined) return names;

  if (Array.isArray(values)) {
    // Arrays: include indices
    values.forEach((v, i) => {
      const p = base ? `${base}.${i}` : String(i);
      names.push(p);
      names.push(...collectFieldNames(v, p));
    });
    return names;
  }

  if (typeof values === 'object') {
    for (const [k, v] of Object.entries(values as Record<string, unknown>)) {
      const p = base ? `${base}.${k}` : k;
      names.push(p);
      names.push(...collectFieldNames(v, p));
    }
    return names;
  }

  // Primitive
  if (base) names.push(base);
  return names;
}

// Validate with zod and reflect issues to TanStack Form meta.errors
export function validateWithZod<T>({
  form,
  schema,
  values,
}: {
  form: any;
  schema: z.ZodTypeAny;
  values: T;
}): { ok: boolean; data: T | undefined } {
  const parsed = schema.safeParse(values);

  // Map first error per path
  const errorMap = new Map<string, string>();
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.');
      if (!errorMap.has(path)) errorMap.set(path, issue.message);
    }
  }

  // Discover all field names from current values to ensure clearing old errors
  const allFieldNames = Array.from(new Set(collectFieldNames(values)));

  for (const name of allFieldNames) {
    const msg = errorMap.get(name);
    form.setFieldMeta(name as any, (prev: any) => ({
      ...prev,
      // TanStack Form aggregates meta.errors; keep it simple with a single message slot
      errors: msg ? [msg] : [],
    }));
  }

  return {
    ok: parsed.success,
    data: parsed.success ? (parsed.data as T) : undefined,
  };
}
