export interface Group {
  id: number;
  name: string;
  description: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  groupId: number;
  group: Group;
}
