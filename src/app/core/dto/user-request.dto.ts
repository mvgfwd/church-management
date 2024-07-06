export interface UserRequest {
  page?: number;
  size?: number;
  searchTerm?: string;

  sourceId?: number;
  companySource?: string;
  personalNumber?: string;
  passCardNumber?: string;
  username?: string;
  workStation?: string;
  userStatus?: string;
  firstName?: string;
  lastName?: string;
  userEmail?: string;
  createdAt?: string;
  updatedAt?: string;

  filterByStatus?: string[];
}
