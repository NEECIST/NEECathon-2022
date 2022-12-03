import React, { useEffect } from "react";

function Schedule(props) {
  const [dots, setDots] = React.useState([0, 0, 0, 0, 0]);
  const [height1, setHeight1] = React.useState(0);
  const [height2, setHeight2] = React.useState(0);
  const [height3, setHeight3] = React.useState(0);
  const [height4, setHeight4] = React.useState(0);
  const [height5, setHeight5] = React.useState(0);
  const [height6, setHeight6] = React.useState(0);
  const [height7, setHeight7] = React.useState(0);
  const [height8, setHeight8] = React.useState(0);
  const [height9, setHeight9] = React.useState(0);
  const [height10, setHeight10] = React.useState(0);

  const [width1, setWidth1] = React.useState(0);

  function updateTime() {
    var dia1 = {
      0: new Date(2022, 10, 28, 10, 0, 0), // Inicio da NEECathon
      1: new Date(2022, 10, 28, 13, 0, 0), // Almoço
      2: new Date(2022, 10, 28, 14, 0, 0), // Início dos projetos
      3: new Date(2022, 10, 28, 17, 0, 0), // Lanche
      4: new Date(2022, 10, 28, 18, 0, 0), // Primeira avaliação
      5: new Date(2022, 10, 28, 20, 0, 0), // Jantar
      6: new Date(2022, 10, 29, 13, 0, 0), // Almoço
      7: new Date(2022, 10, 29, 16, 0, 0), // Avaliação final
      8: new Date(2022, 10, 29, 17, 0, 0), // Entrada dos Prémios
      9: new Date(2022, 10, 29, 18, 0, 0), // Fim da NEECathon
    };

    let now = new Date();

    let new_dots = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let new_lines = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    Object.keys(dia1).forEach((key) => {
      if (now > dia1[key]) {
        new_dots[key] = 1;
      }
      if (now > dia1[key] && now > dia1[parseInt(key) + 1]) {
        new_lines[key] = 1;
      }
      if (now > dia1[key] && now < dia1[parseInt(key) + 1]) {
        let total = (dia1[parseInt(key) + 1] - dia1[key]) / 1000;
        let passed = (now - dia1[key]) / 1000;
        new_lines[key] = passed / total;
      }
    });

    setDots(new_dots);

    
    let height1 = new_lines[0];
    let height2 = new_lines[1];
    let height3 = new_lines[2];
    let height4 = new_lines[3];
    let height5 = new_lines[4];
    let width1 = new_lines[5];
    let height6 = new_lines[6];
    let height7 = new_lines[7];
    let height8 = new_lines[8];
    let height9 = new_lines[9];

    setHeight1(height1);
    setHeight2(height2);
    setHeight3(height3);
    setHeight4(height4);
    setHeight5(height5);
    setHeight6(width1);
    setHeight7(height6);
    setHeight8(height7);
    setHeight9(height8);
    setWidth1(height9);
    setWidth1(width1);

    setTimeout(updateTime, 10000);
  }

  useEffect(() => {
    updateTime();
  }, []);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="12.964 11.33 410 280">
      <defs>
        <linearGradient id="gradient1" x1="1" x2="0" y1="0" y2="0">
          <stop offset="0%" stopColor="#4bd1b4" />
          <stop offset="10%" stopColor="#4bd1b4" />
          <stop offset="100%" stopColor="white" />
        </linearGradient>
      </defs>
      <clipPath id="myClip">
        <rect x="25" y="47.5" width="2" height={height1 * 23.2} fill="#fff"></rect>
        <rect x="25" y="79.3" width="2" height={height2 * 23.2} fill="#fff"></rect>
        <rect x="25" y="111.1" width="2" height={height3 * 23.2} fill="#fff"></rect>
        <rect x="25" y="142.9" width="2" height={height4 * 23.2} fill="#fff"></rect>
        <rect x="25" y="174.7" width="2" height={height5 * 23.2} fill="#fff"></rect>
        <rect x="25" y="206.5" width="2" height={height6 * 232} fill="#fff"></rect>
        <rect x="27" y="150" width={width1 < 0.2 ? 0 : width1 * 221} height="100" fill="#fff"></rect>
        <rect x="248" y="174.2" width="2" height={height7 * 23.2} fill="#fff"></rect>
        <rect x="248" y="206" width="2" height={height8 * 23.2} fill="#fff"></rect>
        <rect x="248" y="237.8" width="2" height={height9 * 23.2} fill="#fff"></rect>
        <rect x="248" y="269.6" width="2" height={height10 * 23.2} fill="#fff"></rect>
      </clipPath>
      <line style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)", strokeDasharray: "4px" }} x1="26" y1="44.414" x2="26" y2="220">
        <title>Dashed</title>
      </line>
      <path
        style={{ stroke: "rgb(68, 68, 68)", fill: "none", strokeLinejoin: "round", strokeLinecap: "round", strokeDasharray: "4px" }}
        d="M 26 45 L 26 225 C 26 225 26 235 33.001 235 C 40 235 200 235 200 235 C 208.864 234.969 208.945 231.237 214.061 220.544 C 219.177 209.851 229.35 170.424 238.603 170.147 C 247.856 169.87 249.232 169.911 249.232 169.911 L 249.468 270"
      ></path>
      <path
        clipPath="url(#myClip)"
        style={{ strokeWidth: "1.4px", stroke: "rgb(75, 209, 180)", fill: "none", strokeLinejoin: "round", strokeLinecap: "round" }}
        d="M 26 39.6 L 26 225 C 26 225 26 235 33.001 235 C 40 235 200 235 200 235 C 208.864 234.969 208.945 231.237 214.061 220.544 C 219.177 209.851 229.35 170.424 238.603 170.147 C 247.856 169.87 249.232 169.911 249.232 169.911 L 249.468 297.218"
      ></path>

      <g clipPath="url(#myClip)">
        <line style={{ fill: "url(#gradient1)", stroke: "url(#gradient1)", strokeWidth: "1.2px" }} x1="0" y1="0" x2="3" y2="0.00001">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M 26 45 L 26 225 C 26 225 26 235 33.001 235 C 40 235 200 235 200 235 C 208.864 234.969 208.945 231.237 214.061 220.544 C 219.177 209.851 229.35 170.424 238.603 170.147 C 247.856 169.87 249.232 169.911 249.232 169.911 L 249.468 297.218"
            rotate="auto-reverse"
          />
        </line>
      </g>
      <text style={{ whiteSpace: "pre", fill: "#fff", fontFamily: "Arial, sans-serif", fontSize: "15.5px" }} x="12.964" y="25.475">
        1º Dia
      </text>
      <text style={{ whiteSpace: "pre", fill: "#fff", fontFamily: "Arial, sans-serif", fontSize: "15.5px" }} x="242.964" y="140.475">
        2º Dia
      </text>
      <g transform="matrix(1, 0, 0, 1, -61.050827, -59.377205)">
        <title>First</title>
        <text style={{ fill: "#fff", fontFamily: "Arial, sans-serif", fontSize: "13px", whiteSpace: "pre" }} x="100" y="106.925">
          10:00 Início da NEECathon
        </text>
        <ellipse style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)" }} cx="87" cy="102.6" rx="3.816" ry="3.816" />
      </g>
      <g transform="matrix(1, 0, 0, 1, -61.050827, -27.578369)">
        <title>Second</title>
        <text style={{ fill: "#fff", fontFamily: "Arial, sans-serif", fontSize: "13px", whiteSpace: "pre" }} x="100" y="106.925">
          13:00 Almoço
        </text>
        <ellipse style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)" }} cx="87" cy="102.6" rx="3.816" ry="3.816" />
      </g>
      <g transform="matrix(1, 0, 0, 1, -61.050827, 3.654313)">
        <title>Third</title>
        <text style={{ fill: "#fff", fontFamily: "Arial, sans-serif", fontSize: "13px", whiteSpace: "pre" }} x="100" y="106.925">
          14:00 Início dos Projectos
        </text>
        <ellipse style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)" }} cx="87" cy="103.1" rx="3.816" ry="3.816" />
      </g>
      <g transform="matrix(1, 0, 0, 1, -61.050827, 36)">
        <title>Forth</title>
        <text style={{ fill: "#fff", fontFamily: "Arial, sans-serif", fontSize: "13px", whiteSpace: "pre" }} x="100" y="106.925">
          17:00 Lanche
        </text>
        <ellipse style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)" }} cx="87" cy="102.6" rx="3.816" ry="3.816" />
      </g>
      <g transform="matrix(1, 0, 0, 1, -61.050827, 67.8)">
        <title>Fifth</title>
        <text style={{ fill: "#fff", fontFamily: "Arial, sans-serif", fontSize: "13px", whiteSpace: "pre" }} x="100" y="106.925">
          18:00 Primeira Avaliação
        </text>
        <ellipse style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)" }} cx="87" cy="102.6" rx="3.816" ry="3.816" />
      </g>
      <g transform="matrix(1, 0, 0, 1, -61.050827, 99.6)">
        <title>Sixth</title>
        <text style={{ fill: "#fff", fontFamily: "Arial, sans-serif", fontSize: "13px", whiteSpace: "pre" }} x="100" y="106.925">
          20:00 Jantar
        </text>
        <ellipse style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)" }} cx="87" cy="102.6" rx="3.816" ry="3.816" />
      </g>
      <g transform="matrix(1, 0, 0, 1, 162.4, 67.2)">
        <title>First</title>
        <text style={{ fill: "#fff", fontFamily: "Arial, sans-serif", fontSize: "13px", whiteSpace: "pre" }} x="100" y="106.925">
          13:00 Almoço
        </text>
        <ellipse style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)" }} cx="87" cy="102.6" rx="3.816" ry="3.816" />
      </g>
      <g transform="matrix(1, 0, 0, 1, 162.4, 99)">
        <title>Second</title>
        <text style={{ fill: "#fff", fontFamily: "Arial, sans-serif", fontSize: "13px", whiteSpace: "pre" }} x="100" y="106.925">
          16:00 Avaliação Final
        </text>
        <ellipse style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)" }} cx="87" cy="102.6" rx="3.816" ry="3.816" />
      </g>
      <g transform="matrix(1, 0, 0, 1, 162.4, 130.8)">
        <title>Third</title>
        <text style={{ fill: "#fff", fontFamily: "Arial, sans-serif", fontSize: "13px", whiteSpace: "pre" }} x="100" y="106.925">
          17:00 Entrega de Prémios
        </text>
        <ellipse style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)" }} cx="87" cy="103.1" rx="3.816" ry="3.816" />
      </g>
      <g transform="matrix(1, 0, 0, 1, 162.4, 162.6)">
        <title>Forth</title>
        <text style={{ fill: "#fff", fontFamily: "Arial, sans-serif", fontSize: "13px", whiteSpace: "pre" }} x="100" y="106.925">
          18:00 Fim da NEECathon
        </text>
        <ellipse style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(68, 68, 68)" }} cx="87" cy="102.6" rx="3.816" ry="3.816" />
      </g>

      <g transform="matrix(1, 0, 0, 1, -67.035675, -54.120544)">
        {dots[0] ? <ellipse style={{ stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px", fill: "rgb(79, 79, 79)" }} cx="92.985" cy="97.343" rx="3.816" ry="3.816" /> : null /*First Painted*/}
        {dots[1] ? <ellipse style={{ stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px", fill: "rgb(79, 79, 79)" }} cx="92.985" cy="129.142" rx="3.816" ry="3.816" /> : null /*Second Painted*/}
        {dots[2] ? <ellipse style={{ stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px", fill: "rgb(79, 79, 79)" }} cx="92.985" cy="160.941" rx="3.816" ry="3.816" /> : null /*Third Painted*/}
        {dots[3] ? <ellipse style={{ stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px", fill: "rgb(79, 79, 79)" }} cx="92.985" cy="192.6" rx="3.816" ry="3.816" /> : null /*Forth Painted*/}
        {dots[4] ? <ellipse style={{ stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px", fill: "rgb(79, 79, 79)" }} cx="92.985" cy="224.4" rx="3.816" ry="3.816" /> : null /*Fifth Painted*/}
        {dots[5] ? <ellipse style={{ stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px", fill: "rgb(79, 79, 79)" }} cx="92.985" cy="256.4" rx="3.816" ry="3.816" /> : null /*Sixth Painted*/}

        {dots[6] ? <ellipse style={{ stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px", fill: "rgb(79, 79, 79)" }} cx="316.5" cy="224" rx="3.816" ry="3.816" /> : null /*Sixth Painted*/}
        {dots[7] ? <ellipse style={{ stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px", fill: "rgb(79, 79, 79)" }} cx="316.5" cy="255.8" rx="3.816" ry="3.816" /> : null /*Sixth Painted*/}
        {dots[8] ? <ellipse style={{ stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px", fill: "rgb(79, 79, 79)" }} cx="316.5" cy="287.9" rx="3.816" ry="3.816" /> : null /*Sixth Painted*/}
        {dots[9] ? <ellipse style={{ stroke: "rgb(75, 209, 180)", strokeWidth: "1.3px", fill: "rgb(79, 79, 79)" }} cx="316.5" cy="319.4" rx="3.816" ry="3.816" /> : null /*Sixth Painted*/}
      </g>
    </svg>
  );
}

export default Schedule;
