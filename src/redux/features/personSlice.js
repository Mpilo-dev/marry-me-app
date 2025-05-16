import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../helpers/axiosInstance";

// Async thunk for creating a person
export const createPerson = createAsyncThunk(
  "person/create",
  async (personData, { rejectWithValue }) => {
    try {
      const response = await api.post("persons", personData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create person";
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for deleting a person
export const deletePerson = createAsyncThunk(
  "person/delete",
  async (personId, { rejectWithValue }) => {
    if (!personId) {
      console.error("Delete attempted without personId");
      return rejectWithValue("No person ID provided for deletion");
    }

    try {
      console.log("Making delete request for personId:", personId);
      const response = await api.delete(`persons/${personId}`);
      console.log("Delete response:", {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      });

      // Handle 204 No Content response
      if (response.status === 204) {
        console.log("Delete successful (204 No Content)");
        return { id: personId };
      }

      return { id: personId, data: response.data };
    } catch (error) {
      console.error("Delete error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });

      // Handle specific error messages from the backend
      if (error.response?.status === 404) {
        return rejectWithValue("No person found with that ID");
      }
      if (error.response?.status === 400) {
        return rejectWithValue(
          "Cannot delete a married person. Divorce first."
        );
      }
      const errorMessage =
        error.response?.data?.message || "Failed to delete person";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  persons: [],
  isLoading: false,
  error: null,
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create person cases
      .addCase(createPerson.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPerson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.persons.push(action.payload.data.person);
        state.error = null;
      })
      .addCase(createPerson.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete person cases
      .addCase(deletePerson.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePerson.fulfilled, (state, action) => {
        state.isLoading = false;
        const filteredPersons = state.persons.filter(
          (person) => person._id !== action.payload.id
        );
        console.log("Persons after deletion:", filteredPersons);
        state.persons = filteredPersons;
        state.error = null;
      })
      .addCase(deletePerson.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error("Delete rejected:", action.payload);
      });
  },
});

export const { clearError } = personSlice.actions;
export default personSlice.reducer;
