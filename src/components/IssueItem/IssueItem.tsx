import { Box, Text } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import { IIssue } from "../../types/types";
import { FC } from "react";
import { helpers } from "../../helpers/helpers";

interface Props {
  issue: IIssue;
  index: number;
}

const IssueItem: FC<Props> = ({ issue, index }) => {
  const { id, author_association, comments, created_at, title } = issue;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            borderRadius={10}
            bg='white.100'
            p={2}
            borderWidth={1}
            borderColor='dark.200'
            style={{ cursor: 'grab' }}
            draggable={true}
          >
            <Text>{title}</Text>
            <Text color='dark.100'>#{id} opened {helpers.formatedDate(helpers.normalizeDate(created_at))}</Text>
            <Text>{author_association} | Comments: {comments}</Text>
          </Box>
        </div>
      )}
    </Draggable>
  )
}

export default IssueItem;
