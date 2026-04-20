import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Doctor, PatientInfo } from '../types';

interface BookingState {
  selectedDoctor: Doctor | null;
  selectedDay: string | null;
  selectedSlot: string | null;
  patientInfo: PatientInfo | null;
  bookingId: string | null;
}

const initialState: BookingState = {
  selectedDoctor: null,
  selectedDay: null,
  selectedSlot: null,
  patientInfo: null,
  bookingId: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setDoctor: (state, action: PayloadAction<Doctor>) => {
      state.selectedDoctor = action.payload;
    },
    setDay: (state, action: PayloadAction<string>) => {
      state.selectedDay = action.payload;
    },
    setSlot: (state, action: PayloadAction<string>) => {
      state.selectedSlot = action.payload;
    },
    setPatientInfo: (state, action: PayloadAction<PatientInfo>) => {
      state.patientInfo = action.payload;
    },
    confirmBooking: (state) => {
      state.bookingId = 'BK-' + Math.floor(100000 + Math.random() * 900000);
    },
    reset: () => initialState,
  },
});

export const { setDoctor, setDay, setSlot, setPatientInfo, confirmBooking, reset } =
  bookingSlice.actions;
export default bookingSlice.reducer;
