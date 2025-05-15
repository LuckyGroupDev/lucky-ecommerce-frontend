// src/app/shared/utils/api-response.helper.ts
import { map } from 'rxjs';

export function mapApiResponse<T>() {
  return map((response: { data: T }) => response.data);
}
