export interface Author {
  id: string;
  name: string;
  bio?: string;
}

export interface CreateAuthorInput {
  name: string;
  bio?: string;
}
