import FileSaver from 'file-saver';

const PARTIES = 'parties';

const partyPersistence = {
  save: (partyName, characters) => {
    const parties = getParties();
    parties[partyName] = characters.filter(char => !char.enemy);

    localStorage.setItem(PARTIES, JSON.stringify(parties));
  },
  load: partyName => getParties()[partyName],
  partyList: () => Object.keys(getParties()),
  exportParty: (characters) => {
    const blob = new Blob([JSON.stringify(characters.filter(char => !char.enemy))], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, 'anima-party.json');
  },
  importParty: (onImport) => {
    const fileSelector = buildFileSelector();
    fileSelector.onchange = () => {
      const reader = new FileReader();
      const file = fileSelector.files[0];

      reader.onload = (evt) => {
        try {
          const importedParty = JSON.parse(evt.target.result);
          onImport(importedParty);
        } catch (error) {
          console.error("couldn't read file");
          console.error(error);
        } finally {
          fileSelector.remove();
        }
      };

      reader.onerror = () => {
        console.error("couldn't read file");
        fileSelector.remove();
      };

      reader.readAsText(file, 'UTF-8');
    };

    fileSelector.click();
  },
};

const getParties = () => {
  const partiesStr = localStorage.getItem(PARTIES);
  return partiesStr === null ? {} : JSON.parse(localStorage.getItem(PARTIES));
};

const buildFileSelector = () => {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  return fileSelector;
};

export default partyPersistence;
