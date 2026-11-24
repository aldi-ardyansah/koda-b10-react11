import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async ({ name, status }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      if (name) params.append("name", name);
      if (status) params.append("status", status);

      const response = await fetch(
        `https://rickandmortyapi.com/api/character?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Character not found");
      }

      const data = await response.json();

      return data.results;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (prevState) => ({
        ...prevState,
        loading: true,
        error: null,
      }))
      .addCase(fetchCharacters.fulfilled, (prevState, action) => ({
        ...prevState,
        characters: action.payload,
        loading: false,
      }))
      .addCase(fetchCharacters.rejected, (prevState, action) => ({
        ...prevState,
        characters: [],
        loading: false,
        error: action.payload,
      }));
  },
});

export default charactersSlice.reducer;