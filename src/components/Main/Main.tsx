import { useEffect } from "react"
import { Grid } from "@chakra-ui/react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import IssuesList from "../IssuesList/IssuesList"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { setNewIssuesPositionOnBoard } from "../../store/features/issuesSlice"
import { useLocalStorage } from "../../hooks/useLocalStorage"

const Main = () => {
  const { boards, url } = useAppSelector(state => state.issues)
  const dispatch = useAppDispatch();
  const [storage, setStorage] = useLocalStorage([], `${url}`)

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const board = boards.find(board => board.id === source.droppableId);

      if (!board) {
        return;
      }

      const newIssues = [...board.issues];
      const [removedIssue] = newIssues.splice(source.index, 1);
      newIssues.splice(destination.index, 0, removedIssue);

      const updatedBoards = boards.map(b => (b.id === source.droppableId ? { ...b, issues: newIssues } : b));
      setStorage(updatedBoards)
    }
    else {
      const sourceBoard = boards.find(board => board.id === source.droppableId);
      const destinationBoard = boards.find(board => board.id === destination.droppableId);

      if (!sourceBoard || !destinationBoard) {
        return;
      }

      const newSourceIssues = [...sourceBoard.issues];
      const newDestinationIssues = [...destinationBoard.issues];

      const [movedIssue] = newSourceIssues.splice(source.index, 1);
      newDestinationIssues.splice(destination.index, 0, movedIssue);

      const updatedBoards = boards.map(b => {
        if (b.id === source.droppableId) {
          return { ...b, issues: newSourceIssues };
        }
        if (b.id === destination.droppableId) {
          return { ...b, issues: newDestinationIssues };
        }
        return b;
      });

      setStorage(updatedBoards)
    }
  };

  useEffect(() => {
    if (storage.length) {
      dispatch(setNewIssuesPositionOnBoard(storage));
    }
  }, [dispatch, boards, storage]);

  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
      <DragDropContext onDragEnd={onDragEnd}>
        {boards.map(board => (
          <IssuesList key={board.id} board={board} type={board.title} />
        ))}
      </DragDropContext>
    </Grid>
  )
}

export default Main
