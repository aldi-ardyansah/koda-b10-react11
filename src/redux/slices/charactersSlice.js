import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (prevState) => ({
      ...prevState,
      loading: true,
      error: null,
    }),
    setCharacters: (prevState, action) => ({
      ...prevState,
      characters: action.payload,
      loading: false,
    }),
    setError: (prevState, action) => ({
      ...prevState,
      characters: [],
      loading: false,
      error: action.payload,
    }),
  },
});

const { setLoading, setCharacters, setError } = charactersSlice.actions;

const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    dispatch(setLoading());

    try {
      const params = new URLSearchParams();

      if (arg.name) params.append("name", arg.name);
      if (arg.status) params.append("status", arg.status);

      const response = await fetch(
        `https://rickandmortyapi.com/api/character?${params.toString()}`
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Something went wrong");
      }

      const data = await response.json();

      dispatch(setCharacters(data.results));

      return data.results;
    }
    catch (error) {
      dispatch(setError(error.message));

      return rejectWithValue(error.message);
    }
  }
);

export const charactersActions = {
  ...charactersSlice.actions,
  fetchCharacters,
};

export { fetchCharacters };

export default charactersSlice.reducer;