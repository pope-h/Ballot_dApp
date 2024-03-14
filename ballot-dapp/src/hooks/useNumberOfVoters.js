import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { wssProvider } from "../constants/providers";

const useNumberOfVoters = () => {
  const [value, setValue] = useState(0);

  const trackingvoters = useCallback((log) => {
    console.log("testing event: ", log);
    setValue((prevValue) => prevValue + 1);
  }, []);

  useEffect(() => {
    const filter = {
      address: import.meta.env.VITE_ballot_contract_address,
      topics: [ethers.id("GiveRightToVote(address,uint256)")],
    };

    wssProvider.getLogs({ ...filter, fromBlock: 5470768 }).then((events) => {
      setValue(events.length + 1);
    });

    const wssProvider2 = new ethers.WebSocketProvider(
      import.meta.env.VITE_wss_rpc_url
    );

    wssProvider2.on(filter, trackingvoters);

    return () => wssProvider2.off(filter, trackingvoters);
  }, [trackingvoters]);

  return value;
};

export default useNumberOfVoters;