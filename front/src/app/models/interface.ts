export interface IdPayload {
  auditId: string;
  email: string;
  given_name: string;
  family_name: string;
  exp: number;
  droit_gag: Array<string>;
}

export interface Token {
  access_token: string;
  id_token: string;
  user_data: object;
}
export interface UserData {
  auditId: string;
  droit_gag: Array<string>;
  email: string;
  family_name: string;
  given_name: string;
  name: string;
  organizational_unit_code: string;
  sub: string;
  subname: string;
}

interface TypeValue {
  type: string;
  value: string;
}

export interface Batch {
  idPacket: string;
  status: string;
  domain: string;
  startInjectionDate?: string;
  endInjectionDate?: string;
  lock?: boolean;
  lockComment?: string;
  numberOfDocument?: number;
  idSICreator: string;
  routings?: TypeValue[];
  documentTypes?: TypeValue[];
}

export interface ContextMenuAction {
  name: string;
  action: () => void;
}

interface injectionDate {
  startDate?: Date;
  endDate?: Date;
}
export interface Filter {
  network?: object;
  lock: string;
  injectionDate?: injectionDate;
}
