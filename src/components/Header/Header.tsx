import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { helpers } from "../../helpers/helpers";
import { fetchIssues, fetchRepoData } from "../../store/actions/actions";
import { setUrl } from "../../store/features/issuesSlice";

const Header = () => {
  const [query, setQuery] = useState('')
  const { error, repoData, isLoading } = useAppSelector(state => state.issues);
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector(state => state.issues)

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const submitHandler = () => {
    dispatch(setUrl(query))
    const transformedUrl = helpers.transformedUrl(query);

    dispatch(fetchIssues(transformedUrl.repoUrl))
    dispatch(fetchRepoData(transformedUrl.ownerUrl))

    setQuery('')
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <FormControl w="100%" isInvalid={!!error} isRequired>
        <Box w="100%" display="flex" alignItems="center" gap="12px">
          <Input
            type='email'
            placeholder="Enter repo URL"
            value={query}
            onChange={inputChangeHandler}
            required
          />

          <Button
            px={4}
            minW="200px"
            color='dark.300'
            variant='outline'
            bg='white.100'
            fontWeight={600}
            onClick={submitHandler}
          >
            Load issues
          </Button>
        </Box>
        {
          !error
            ? (
              <FormHelperText>
                Enter the repository link which from you want to see the issues
              </FormHelperText>
            )
            : <FormErrorMessage>{error}</FormErrorMessage>
        }
      </FormControl>
      {!!boards.length && !isLoading && !error && <Box display="flex" gap={8}>
        <Breadcrumb spacing="8px" color="blue.100" separator={<ChevronRightIcon color='blue.100' />}>
          <BreadcrumbItem>
            <BreadcrumbLink
              target="_blank"
              href={`https://github.com/${repoData.organization}`}
            >
              {helpers.normalizeText(repoData.organization)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              target="_blank"
              href={`https://github.com/${repoData.organization}/${repoData.name}`}
            >
              {helpers.normalizeText(repoData.name)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box display="flex" gap={2} alignItems="center">
          <Box>⭐</Box>
          <Text color='dark.100' fontWeight={600}>{helpers.normalizeStarsCount(repoData.stargazers_count)} K stars</Text>
        </Box>
      </Box>}
    </Box>
  );
};

export default Header;
