import React, { useEffect, useRef } from 'react';
import Vex from 'vexflow';

const VF = Vex.Flow;

const App = () => {
  const divRef = useRef();

  useEffect(() => {
    if (divRef.current) {
      // Fetch the JSON data from the public folder
      fetch(process.env.PUBLIC_URL + '/notes.json')
        .then(response => response.json())
        .then(data => {

          // Create a Factory, EasyScore, and System
          const vf = new VF.Factory({ renderer: { elementId: divRef.current, width: 500, height: 1000 }, });
          const score = vf.EasyScore();
          const system = vf.System();

          // Loop through the data
          data.forEach((item, index) => {
            // Add a stave with the voices to the system for each line of music
            system.addStave({
              voices: [
                score.voice(score.notes(item.notes, {clef: item.clef, stem: item.stem})),
              ],
            }).addClef(item.clef).addTimeSignature('4/4');
           });

          // Draw the score
          vf.draw();
        });
    }
  }, []);

  return <div ref={divRef} />;
};

export default App;
