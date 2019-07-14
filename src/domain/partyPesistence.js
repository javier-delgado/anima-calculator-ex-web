const PARTIES = 'parties';

const partyPersistence = {
  save: (partyName, party) => {
    const parties = getParties();
    parties[partyName] = party;

    localStorage.setItem(PARTIES, JSON.stringify(parties));
  },
  load: partyName => getParties()[partyName],
  partyList: () => getParties().keys,
};

const getParties = () => {
  const partiesStr = localStorage.getItem(PARTIES);
  return partiesStr === null ? {} : JSON.parse(localStorage.getItem(PARTIES));
};

export default partyPersistence;
