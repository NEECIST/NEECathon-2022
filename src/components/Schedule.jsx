import React, {useEffect } from 'react'

function Schedule(props){

  const [dots, setDots] = React.useState([0, 0, 0, 0, 0]);
  const [lines, setLines] = React.useState([0, 0, 0, 0]);
  const [totalSize, setTotalSize] = React.useState(0);

  function updateTime(){

    var dia1 = {
      "0": new Date(2022, 9, 30, 20, 0, 0), // Inicio da NEECathon
      "1": new Date(2022, 9, 30, 15, 30, 0), // Almoço
      "2": new Date(2022, 11, 12, 16, 40, 0), // Início dos projetos
      "3": new Date(2022, 11, 20, 17, 45, 0), // Primeira avaliação
      //"4": new Date(2022, 9, 31, 22, 0, 0) // Jantar
    }

    let now = new Date();

    let new_dots = [0, 0, 0, 0, 0];
    let new_lines = [0, 0, 0, 0];


    Object.keys(dia1).forEach((key) => {
      if (now > dia1[key]){
        new_dots[key] = 1; 
      }
      if(now > dia1[key] && now > dia1[parseInt(key)+1]){
        new_lines[key] = 1;
      }
      if(now > dia1[key] && now < dia1[parseInt(key)+1]){
        let total = (dia1[parseInt(key)+1] - dia1[key]) / 1000;
        let passed = (now - dia1[key]) / 1000;
        new_lines[key] = passed / total;
      }
    });

    setDots(new_dots);
    setLines(new_lines);
    
    console.log(new_dots);
    console.log(new_lines);

    // console.log(47.5);
    // console.log(8.7*new_dots[1]);
    // console.log(8*new_dots[2]);
    // console.log(23.2*new_lines[0]);
    // console.log(23.2*new_lines[1]);
    // console.log(23.2*new_lines[2]);
    setTotalSize(47.5 + 8.7*new_dots[1] + 8*new_dots[2] + 23.2*new_lines[0] + 23.2*new_lines[1] + 23.2*new_lines[2])

    console.log(totalSize);
    setTimeout(updateTime, 60000);

  }

  useEffect(() => {
    updateTime()
  }, []);

  
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="12.964 11.33 183.475 133.225">
      <defs>
        <linearGradient id="gradient1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#4bd1b4" />
          <stop offset="70%" stop-color="#4bd1b4" />
          <stop offset="100%" stop-color="white" />
        </linearGradient>
      </defs>
      <line style={{fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)", strokeDasharray: "4px"}} x1="26" y1="44.414" x2="26" y2="140.093">
        <title>Dashed</title>
      </line>
        
      <g>
        <title>PaintedLines</title>
        {lines[0] === 0?null:<line style={{fill: "rgb(216, 216, 216)", stroke: "rgb(75, 209, 180)", strokeWidth: "1.2px"}} x1="26" y1="47.5" x2="26" y2={totalSize}/>  /*Line between 0 and 1*/} 
        {/* {lines[1]=0?null:<line style={{fill: "rgb(216, 216, 216)", stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px"}} x1="26" y1="79.4" x2="26" y2={79.4 + 23.2*lines[1]}/> /*Line between 1 and 2*/}
        {/* {lines[2]=0?null:<line style={{fill: "rgb(216, 216, 216)", stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px"}} x1="26" y1="110.6" x2="26" y2={110.6 + 23.2*lines[2]}/>  /*Line between 2 and 3*/}
      </g>
        <line style={{fill:  "url(#gradient1)", stroke: "url(#gradient1)", strokeWidth: "1.3px"}} x1="26" y1="47.5" x2="26.001" y2={totalSize}>
        <animate
          attributeName="y2"
          values={`47.5; ${totalSize}`}
          dur="2s"
          repeatCount="indefinite" />
        </line>
      <text style={{whiteSpace: "pre", fill: "rgb(51, 51, 51)", fontFamily: "Arial, sans-serif", fontSize: "15.5px"}} x="12.964" y="25.475">1º Dia</text>
      <g transform="matrix(1, 0, 0, 1, -61.050827, -59.377205)">
        <title>First</title>
        <text style={{fill: "rgb(51, 51, 51)", fontFamily: "Arial, sans-serif", fontSize: "13px", whiteSpace: "pre"}} x="100" y="106.925">10:00 Início da NEECathon</text>
        <ellipse style={{fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)"}} cx="87" cy="102.6" rx="3.816" ry="3.816"/>
      </g>
      <g transform="matrix(1, 0, 0, 1, -61.050827, -27.578369)">
        <title>Second</title>
        <text style={{fill: "rgb(51, 51, 51)", fontFamily: "Arial, sans-serif", fontSize: "13px", whiteSpace: "pre"}} x="100" y="106.925">13:00 Almoço</text>
        <ellipse style={{fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)"}} cx="87" cy="102.6" rx="3.816" ry="3.816"/>
      </g>
      <g transform="matrix(1, 0, 0, 1, -61.050827, 3.654313)">
        <title>Third</title>
        <text style={{fill: "rgb(51, 51, 51)", fontFamily: "Arial, sans-serif", fontSize: "13px", whiteSpace: "pre"}} x="100" y="106.925">14:00 Início dos Projectos</text>
        <ellipse style={{fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)"}} cx="87" cy="103.1" rx="3.816" ry="3.816"/>
      </g>
      <g transform="matrix(1, 0, 0, 1, -61.050827, 35.170074)">
        <title>Forth</title>
        <text style={{fill: "rgb(51, 51, 51)", fontFamily: "Arial, sans-serif", fontSize: "13px", whiteSpace: "pre"}} x="100" y="106.925">17:00 Lanche</text>
        <ellipse style={{fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)"}} cx="87" cy="102.6" rx="3.816" ry="3.816"/>
      </g>
      <g transform="matrix(1, 0, 0, 1, -67.035675, -54.120544)">
      {dots[0]?<ellipse style={{stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px", fill: "rgb(79, 79, 79)"}} cx="92.985" cy="97.343" rx="3.816" ry="3.816"/>:null  /*First Painted*/} 
      {dots[1]?<ellipse style={{stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px", fill: "rgb(79, 79, 79)"}} cx="92.985" cy="129.142" rx="3.816" ry="3.816"/>:null /*Second Painted*/} 
      {dots[2]?<ellipse style={{stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px", fill: "rgb(79, 79, 79)"}} cx="92.985" cy="160.941" rx="3.816" ry="3.816"/>:null /*Third Painted*/}
      {dots[3]?<ellipse style={{stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px", fill: "rgb(79, 79, 79)"}} cx="92.985" cy="191.8" rx="3.816" ry="3.816"/>:null  /*Forth Painted*/}
      </g>
    </svg>
  )
  
}

export default Schedule