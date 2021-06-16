// imports
import styled from "styled-components";
var fs = require('fs');
// logic
const library = require("./plantNameLibrary");

const File = styled.div`

`;
// not actually a grid
const Grid = styled.div`
  display: flex;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: flex-start;
  border: 2px solid;
  margin: 5px;
`;
const BotanicalTitle = styled.h3`
  margin: 2px;
`;
const Name = styled.p`
  margin: 2px;
`;

function generateTable() {
  console.log("starting plantTable.json generation");
  let data = "{";
  let link;
  console.log(library.default);
  library.default.forEach(plant => {
    data += `"${plant.botanical}":"${plant.botanical}",`;
    link = plant.botanical;
    plant.linkedNames.forEach(name => {
      data += `"${name}":"${link}",`
    })
  });
  data += "}";
  // regex
  data = data.replace(/(?!")(?!:)(?!,)(?!{)(?!})\W+/gim, '-');
  console.log(data);
  // download
  const a = document.createElement('a');
  const file = new Blob([`${data}`], {type: 'text/plain'});
  
  a.href= URL.createObjectURL(file);
  a.download = 'plantTable.json';
  a.click();
  
  URL.revokeObjectURL(a.href);
}

function generateSuggestions() {
  console.log("starting PlantSuggestion.js generation");
  let data = "export default [";
  console.log(library.default);
  library.default.forEach(plant => {
    data += `"${plant.botanical}", `;
    plant.linkedNames.forEach(name => {
      data += `"${name}", `;
    })
  });
  data += "]";
  console.log(data);
  const a = document.createElement('a');
  const file = new Blob([`${data}`], {type: 'text/plain'});
  
  a.href= URL.createObjectURL(file);
  a.download = 'PlantSuggestions.js';
  a.click();
  
  URL.revokeObjectURL(a.href);
}

function App() {
  console.log(library);
  // Keep the .default it avoids a bug where i cant map because library is an object
  const mapping = library.default.map((plant) => {
    {
      return (
        <Card>
          <BotanicalTitle>{plant.botanical}</BotanicalTitle>
          <>
            {plant.linkedNames.map((name) => {
              {
                return <Name>{name}</Name>;
              }
            })}
          </>
        </Card>
      );
    }
  });

  return (
    <div>
      <File>
        <button onClick={generateTable}>
          Generate plantTable.json
        </button>
        <button onClick={generateSuggestions}>
          Generate plantSuggestion.js
        </button>
      </File>
      <Grid>{mapping}</Grid>
    </div>
  );
}

export default App;
