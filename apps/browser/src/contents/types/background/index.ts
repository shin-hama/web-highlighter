export interface CommonMessageResponse<T = undefined> {
  message: string;
  status: number;
  ok: boolean;
  data?: T;
}
