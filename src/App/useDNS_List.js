import { useState, useEffect } from 'react';
import { defaultData } from './globals';

var { getLatency } = require('./kernel');


const useDNS_List = () => {
    const [DNS_List, setDNS_List] = useState(defaultData.DNS_list);
    const [BestDNS_id, setBestDNS_id] = useState(1);
    const [IsUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        async function updateLatency() {

            var min = Infinity;
            var best_id;
            for (const id in DNS_List) {
                var latency = await getLatency(DNS_List[id].DNS_servers);
                DNS_List[id].latency = latency;
                if (latency < min) {
                    min = latency;
                    best_id = id;
                }
            }

            setBestDNS_id(best_id);
            setDNS_List(DNS_List);
            setIsUpdate(true);
        }

        updateLatency();
    }, []);

    return [DNS_List, BestDNS_id, IsUpdate];
}

export default useDNS_List;