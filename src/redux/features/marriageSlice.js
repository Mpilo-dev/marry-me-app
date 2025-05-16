import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

// Create marriage
export const createMarriage = createAsyncThunk(
  "marriage/createMarriage",
  async ({ husbandId, wifeId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/marriages", {
        husbandId,
        wifeId,
      });
      return response.data.data.marriage;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get all marriages
export const fetchMarriages = createAsyncThunk(
  "marriage/fetchMarriages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/marriages");
      return response.data.data.marriages;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteMarriage = createAsyncThunk(
  "marriage/deleteMarriage",
  async (marriageId, { rejectWithValue }) => {
    try {
      console.log("Attempting to divorce marriage with ID:", marriageId);
      const url = `/marriages/${marriageId}/divorce`.trim();
      console.log("Full API URL:", axiosInstance.defaults.baseURL + url);

      const response = await axiosInstance.patch(url);
      console.log("Divorce response:", response.data);
      return response.data.data.marriage;
    } catch (error) {
      console.error("Divorce error details:", {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
      });
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to process divorce"
      );
    }
  }
);

const initialState = {
  marriages: [],
  loading: false,
  error: null,
};

const marriageSlice = createSlice({
  name: "marriage",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create marriage
      .addCase(createMarriage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMarriage.fulfilled, (state, action) => {
        state.loading = false;
        state.marriages.push(action.payload);
      })
      .addCase(createMarriage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch marriages
      .addCase(fetchMarriages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarriages.fulfilled, (state, action) => {
        state.loading = false;
        state.marriages = action.payload;
      })
      .addCase(fetchMarriages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Marriage (Divorce)
      .addCase(deleteMarriage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMarriage.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the divorced marriage from the list
        state.marriages = state.marriages.filter(
          (marriage) => marriage._id !== action.payload._id
        );
      })
      .addCase(deleteMarriage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = marriageSlice.actions;
export default marriageSlice.reducer;
