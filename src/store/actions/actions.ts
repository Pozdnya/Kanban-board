import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { helpers } from "../../helpers/helpers";

export const fetchRepoData = createAsyncThunk(
  'issues/fetchRepoData',
  async (url: string) => {
    const response = await axios.get(url)

    return {
      stargazers_count: response.data.stargazers_count,
      name: response.data.name,
      organization: response.data.organization.login,
    }
  }
)

export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async (url: string) => {
    const response = await axios.get(url, {params: {state: 'all'}})

    const filtredDataByBoardType = helpers.filteredIssuesByState(response.data)

    return filtredDataByBoardType;
  }
)

