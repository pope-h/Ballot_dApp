import { Box, Container, Flex, Text } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import Proposal from "./component/Proposal";
import DelegateVote from "./component/DelegateVote";
import useProposals from "./hooks/useProposals";
import useHandleVote from "./hooks/useHandleVote";
import useNumberOfVoters from "./hooks/useNumberOfVoters";
import useNumberOfDelegates from "./hooks/useNumberOfDelegates";

configureWeb3Modal();

function App() {
  const { loading, data: proposals } = useProposals();

  const handleVote = useHandleVote();
  const numberOfVoters = useNumberOfVoters();
  const numberOfDelegates = useNumberOfDelegates();

  return (
    <Container>
      <Header />
      <main className="lg:mt-16 mt-8 flex flex-wrap justify-start px-6 py-8 md:justify-end gap-4 items-center">
        <button className="bg-sky-700 text-white text-sm py-3 px-6 rounded-md">
          Eligible Number of Voters:
          <span className="bg-sky-100 ml-2 rounded-lg text-sky-500 px-2 py-1 font-bold">
            {numberOfVoters}
          </span>
        </button>
        <button className="bg-sky-700 text-white text-sm py-3 px-6 rounded-md">
          Number of Delegated Voters:
          <span className="bg-sky-100 ml-2 rounded-lg text-sky-500 px-2 py-1 font-bold">
            {numberOfDelegates}
          </span>
        </button>
      </main>
      <main className="mt-6">
        <Box mb="4">
          <DelegateVote />
        </Box>

        <Flex wrap={"wrap"} gap={"6"}>
          {loading ? (
            <Text>Loading...</Text>
          ) : proposals.length !== 0 ? (
            proposals.map((item, index) => (
              <Proposal
                key={index}
                name={item.name}
                handleVote={() => handleVote(index)}
                id={index}
                voteCount={Number(item.voteCount)}
              />
            ))
          ) : (
            <Text>Could not get proposals!!</Text>
          )}
        </Flex>
      </main>
    </Container>
  );
}

export default App;