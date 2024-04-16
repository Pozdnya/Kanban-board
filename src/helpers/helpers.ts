import { v4 as uuidv4 } from 'uuid';
import { ListType, RepoStates } from "../types/enums";
import { IBoard, IIssue, ITransformUrl } from "../types/types";
const BASE_URL = 'https://api.github.com/repos'

function transformedUrl(url: string): ITransformUrl {
  const [, , , owner, repo] = url.split('/');

  return {
    owner,
    repo,
    ownerUrl: `${BASE_URL}/${owner}/${repo}`,
    repoUrl: `${BASE_URL}/${owner}/${repo}/issues`,
  };
}

function normalizeText(text: string): string {
  const firstLetter = text.charAt(0).toUpperCase();
  const restLetters = text.slice(1);

  return `${firstLetter}${restLetters}`
}

function normalizeStarsCount(stars: number | null): number {
  if (!stars) {
    return 0;
  }

  return Math.round((stars / 1000))
}

function normalizeDate(date: Date): number {
  const startDate = new Date(date).getTime();
  const currentDate = new Date().getTime();

  const result = Math.round((currentDate - startDate) / (1000 * 60 * 60 * 24))

  return result;
}

function formatedDate(dayCount: number): string {
  if (dayCount === 0) {
    return 'today'
  }

  return `${dayCount} days ago`
}

function filteredIssuesByState(issues: IIssue[]): IBoard[] {
  return [
    {
      id: uuidv4(),
      title: ListType.TODO,
      issues: issues
        .map(issue => ({
          ...issue,
          id: issue.id.toString()
        }))
        .filter(issue => issue.state === RepoStates.OPEN)
    },
    {
      id: uuidv4(),
      title: ListType.IN_PROGRESS,
      issues: issues
        .map(issue => ({
          ...issue,
          id: issue.id.toString()
        }))
        .filter(issue => issue.state !== RepoStates.OPEN && issue.state !== RepoStates.CLOSED)
    },
    {
      id: uuidv4(),
      title: ListType.DONE,
      issues: issues
        .map(issue => ({
          ...issue,
          id: issue.id.toString()
        }))
        .filter(issue => issue.state === RepoStates.CLOSED)
    },
  ]
}

export const helpers = {
  transformedUrl,
  normalizeText,
  normalizeStarsCount,
  normalizeDate,
  formatedDate,
  filteredIssuesByState,
}