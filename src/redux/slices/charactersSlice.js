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

      let url = `https://rickandmortyapi.com/api/character?${params.toString()}`;
      let characters = [];

      while (url) {
        const response = await fetch(url);

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Something went wrong");
        }

        const data = await response.json();

        characters = [...characters, ...data.results];
        url = data.info.next;
      }

      dispatch(setCharacters(characters));

      return characters;
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