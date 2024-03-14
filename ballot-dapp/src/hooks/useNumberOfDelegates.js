import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { wssProvider } from "../constants/providers";

const useNumberOfDelegates = () => {
    const [value, setValue] = useState(0);

    const trackingdelegates = useCallback((log) => {
        console.log("tracking Num Of Delegates: ", log);
        setValue((prevValue) => prevValue + 1);
    }, []);

    useEffect(() => {
      const filter = {
        address: import.meta.env.VITE_ballot_contract_address,
        topics: [ethers.id("Delegate(address,address,uint256,uint256)")],
      };

      wssProvider.getLogs({ ...filter, fromBlock: 5470768 }).then((events) => {
        setValue(events.length);
      });

      const wssProvider2 = new ethers.WebSocketProvider(
        import.meta.env.VITE_wss_rpc_url
      );

      wssProvider2.on(filter, trackingdelegates);

      return () => wssProvider2.off(filter, trackingdelegates);
    }, [trackingdelegates]);

  return value;
}

export default useNumberOfDelegates