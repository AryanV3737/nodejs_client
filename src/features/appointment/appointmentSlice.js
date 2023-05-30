import { createSlice } from '@reduxjs/toolkit';

const usersJson = [
  {
    "id": 1,
    "name": "John Doe",
    "age": 28,
    "gender": "Male",
    "status": "Consult",
    "time": "06:00 PM",
    "date": "2 Feb 2021",
    "phone": "+91 9876543215",
    "doctor": "Dr. Ananth"
  },
  {
    "id": 2,
    "name": "Mukul Rao",
    "age": 28,
    "gender": "Male",
    "status": "Revisit",
    "time": "06:00 PM",
    "date": "2 Feb 2021",
    "phone": "+91 9876543215",
    "doctor": "Dr. Ananth"
  },
  {
    "id": 3,
    "name": "Neeraj Sharma",
    "age": 28,
    "gender": "Male",
    "status": "Consult",
    "time": "06:00 PM",
    "date": "2 Feb 2021",
    "phone": "+91 9876543215",
    "doctor": "Dr. Ananth"
  }
];

function getEmptyuserForm() {
  return {
    name: '',
    age: '',
    gender: 'Male',
    status: 'Consult',
    time: '',
    date: '',
    phone: '',
    doctor: ''
  }
}

const initialState = {
  users: usersJson, // Initialize with the usersJson data
  userForm: getEmptyuserForm(),
  currUserFormConfig: { index: -1, id: -1, buttonType: 'Book' }, // Corrected the property name
  status: 'idle',
};

// slice of state
export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    getUsers: (state) => {  // Removed the unused 'action' parameter
      state.users = usersJson;
    },
    editUser: (state, action) => {
      state.userForm = { ...state.users[action.payload.index] }; // Fixed the property name
      state.currUserFormConfig = { index: action.payload.index, id: action.payload.id, buttonType: 'Update' };
    },
    deleteUser: (state, action) => {
      state.users.splice(action.payload.index, 1);
      // No fetch call in the reducer. Move the API call outside of the reducer.
    },
    formSubmit: (state, action) => {
      if (action.payload === 'Book') {
        state.users.push(state.userForm);
        // No fetch call in the reducer. Move the API call outside of the reducer.
      } else { // update appointment
        state.users[state.currUserFormConfig.index] = state.userForm;
        // No fetch call in the reducer. Move the API call outside of the reducer.
      }
      state.userForm = getEmptyuserForm();
      state.currUserFormConfig = { index: -1, id: -1, buttonType: 'Book' };
    },
    formChange: (state, action) => {
      state.userForm[action.payload.name] = action.payload.value;
    },
  },
});

export const { getUsers, deleteUser, editUser, formSubmit, formChange } = appointmentSlice.actions;

// selectors
export const showUsers = (state) => state.appointment.users;
export const showUserFormConfig = (state) => state.appointment.currUserFormConfig;
export const showUserForm = (state) => state.appointment.userForm;

export default appointmentSlice.reducer;
