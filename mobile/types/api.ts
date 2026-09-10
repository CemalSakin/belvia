export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

export interface ApiSuccess<T> { readonly ok: true; readonly data: T }
export interface ApiFailure { readonly ok: false; readonly error: string }
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
