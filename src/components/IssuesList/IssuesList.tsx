import { FC } from "react";
import { Box, GridItem, Text } from "@chakra-ui/react";
import { ListType } from "../../types/enums";
import IssueItem from "../IssueItem/IssueItem";
import { IBoard } from "../../types/types";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  type: ListType;
  board: IBoard;
}

const IssuesList: FC<Props> = ({ board, type }) => {
  return (
    <GridItem>
      <Text fontSize='3xl' textAlign='center'>{type}</Text>
      <Droppable droppableId={board.id}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            minH='75vh'
            w='100%'
            bg='gray.100'
            borderWidth={2}
            borderColor='dark.200'
            display='flex'
            flexDirection='column'
            gap={4}
            p={4}
          >
            {board.issues.map((issue, index) => (
              <IssueItem key={issue.id} issue={issue} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </GridItem>
  );
};

export default IssuesList;
