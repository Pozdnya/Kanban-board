import { ListType, RepoStates } from "./enums";

export interface IIssue {
  id: string;
  title: string;
  comments: number;
  state: RepoStates;
  author_association: string;
  created_at: Date;
}

export interface IRepoData {
  stargazers_count: number | null;
  name: string;
  organization: string;
}

export interface IIssuesState {
  issues: IIssue[];
  error: string | undefined;
  isLoading: boolean;
  url: string;
  repoData: IRepoData;
  boards: IBoard[];
}

export interface IBoard {
  id: string;
  title: ListType;
  issues: IIssue[];
}

export interface ITransformUrl {
  owner: string;
  repo: string;
  ownerUrl: string;
  repoUrl: string;
}
