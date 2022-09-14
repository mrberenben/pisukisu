export interface IGenre {
  id: string;
  name: string;
  prefix: string;
  is_suggested: boolean;
  suggestion_reason: string | null;
}
