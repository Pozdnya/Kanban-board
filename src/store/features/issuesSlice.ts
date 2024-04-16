import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard, IIssuesState, IRepoData } from "../../types/types";
import { fetchIssues, fetchRepoData } from "../actions/actions";

export const initialState: IIssuesState = {
  issues: [],
  error: '',
  isLoading: false,
  url: '',
  boards: [],
  repoData: {
    stargazers_count: null,
    name: '',
    organization: '',
  }
}

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setNewIssuesPositionOnBoard: (state, action: PayloadAction<IBoard[]>) => {
      state.boards = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchIssues.fulfilled, (state, action: PayloadAction<IBoard[]>) => {
        state.isLoading = false
        state.boards = action.payload
        state.error = ''
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })
      .addCase(fetchRepoData.fulfilled, (state, action: PayloadAction<IRepoData>) => {
        state.repoData = action.payload
      })
  }
})

export const { setNewIssuesPositionOnBoard, setUrl } = issuesSlice.actions;

export default issuesSlice.reducer
