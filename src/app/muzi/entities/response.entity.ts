export class ListResponseEntity<T> {
  count: number;
  next: string;
  previous: string;

  results: T [];

}
