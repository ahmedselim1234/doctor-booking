export type Specialty =
  | 'cardiology'
  | 'orthopedics'
  | 'dermatology'
  | 'pediatrics'
  | 'ophthalmology'
  | 'neurology'
  | 'gastroenterology'
  | 'ent';

export interface Doctor {
  id: number;
  name: string;
  specialty: Specialty;
  title: string;
  experience: number;
  rating: number;
  reviewCount: number;
  avatarInitials: string;
  image: string;
  availableDays: string[];
  price: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface PatientInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  age: number;
  gender: 'male' | 'female';
  reason?: string;
}

export interface Booking {
  doctor: Doctor;
  day: string;
  slot: string;
  patient: PatientInfo;
  bookingId: string;
}
