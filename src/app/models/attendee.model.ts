export interface Attendee {
  id: number;
  code: number | null;
  name: string;
  lastname: string;
  age: number;
  country: string | null;
  city: string | null;
  email: string;
  phone: string;
  companion: string | null;
  idname: string | null;
  paydate: string; // datetime in DB, store as 'YYYY-MM-DD HH:MM:SS' string
  paymethod: string | null;
  receipt: string | null;
  origamigroup: string | null;
  info: string | null;
  cardsgroup: number | null; // int in DB
  created_at: string | null; // timestamp in DB
  updated_at: string | null; // timestamp in DB
  status: boolean; // tinyint(1) in DB
  cards: boolean; // int in DB, but used as a boolean flag (0/1)
  days: string | null;
  staff: boolean; // tinyint(1) in DB
  special_code: string | null;
  go_to_chiva: boolean; // tinyint(1) in DB
  printCertificate: boolean; // tinyint(1) in DB
  chiva_companions: number; // int in DB
  pay_amount: string | null;
}
