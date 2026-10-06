import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const spotifyTrack = {
  title: 'Gratitude',
  artist: 'Asake',
  url: 'https://open.spotify.com/track/7hiRlw64LXcHpGAVJ6eUzv'
};

const projects = [
  {name:'Pinkmart',type:'hackathon / full-stack',description:'A campus marketplace for discovering student-owned beauty, fashion, and lifestyle businesses.',stack:['React','Node.js','MongoDB'],tone:'pink',image:'/src/assets/pinkmart.png',url:'https://pinkmart.vercel.app/',details:'Built for a Girls Who Code hackathon. I worked across the frontend and full-stack experience to make discovering campus businesses feel simple and fun.'},
  {name:'GridBlock',type:'game / React',description:'A multiplayer puzzle game where players place blocks and compete in real time.',stack:['React','Java'],tone:'brown',image:'/src/assets/gridblock.png',url:'https://gridblock-mu.vercel.app/',details:'I worked on the frontend experience, board logic, styling, and debugging. Basically: little squares caused a lot of debugging.'}
];

function CustomCursor(){
 const [pos,setPos]=useState({x:-100,y:-100});
 const [label,setLabel]=useState('✦');
 const [active,setActive]=useState(false);
 useEffect(()=>{
  const move=e=>{
   setPos({x:e.clientX,y:e.clientY});
   const target=e.target.closest?.('[data-cursor]');
   setActive(!!target);
   setLabel(target?.dataset.cursor || '✦');
  };
  window.addEventListener('mousemove',move);
  return ()=>window.removeEventListener('mousemove',move);
 },[]);
 return <div className={`custom-cursor ${active?'is-active':''}`} style={{left:pos.x,top:pos.y}}><span>{label}</span></div>;
}

function IntroScare(){
 const [stage,setStage]=useState('prompt');
 const trigger=()=>{
  setStage('scare');
  window.setTimeout(()=>setStage('sorry'),1700);
  window.setTimeout(()=>setStage('done'),3900);
 };
 if(stage==='done') return null;
 return <div className={`intro-overlay intro-${stage}`} role="dialog" aria-label="website surprise">
  {stage==='prompt' && <div className="intro-prompt">
    <div className="intro-whisper">pssst...</div>
    <button data-cursor="do it? 👀" className="click-me" onClick={trigger}>click me<br/><span>please?</span></button>
    <div className="intro-sub">I promise nothing bad will happen.</div>
  </div>}
  {stage==='scare' && <div className="jump-scare">
    <div className="scare-noise">NOPE</div>
    <div className="scary-face"><i className="eye left"/><i className="eye right"/><div className="mouth"><span/></div></div>
    <div className="scare-text">I SAID CLICK ME.</div>
  </div>}
  {stage==='sorry' && <div className="sorry-screen"><div className="sorry-face">😈</div><h2>sorry 😭</h2><p>okay okay... welcome to my website.</p><div className="entering">entering demmy's world...</div></div>}
 </div>;
}

function App(){
 const [popup,setPopup]=useState(null),[theme,setTheme]=useState('dark'),[worse,setWorse]=useState(false),[playlist,setPlaylist]=useState(false),[secret,setSecret]=useState(0);
 const openPopup=content=>setPopup(content);
 return <div className={`site ${theme} ${worse?'slightly-worse':''}`}><CustomCursor/><IntroScare/>
  <div className="grain"/>
  <nav className="nav"><a className="logo" data-cursor="home" href="#home">Demmy<span>☆</span></a><div className="navlinks"><a data-cursor="home" href="#home">home</a><a data-cursor="about" href="#about">about</a><a data-cursor="projects" href="#projects">projects</a><a data-cursor="fun ✦" href="#fun">fun stuff</a><a data-cursor="contact" href="#contact">contact</a></div><button data-cursor="☼" className="theme-toggle" onClick={()=>setTheme(theme==='dark'?'warmer':'dark')}>{theme==='dark'?'☾':'☼'}</button></nav>
  <main>
   <section id="home" className="hero section"><div className="hero-copy"><p className="eyebrow">computer science student · probably overthinking</p><h1>hi, i'm<br/><em>Demmy</em><span>☆</span></h1><p className="hero-line">I build things, explore ideas, and occasionally make a website way more complicated than it needs to be.</p><div className="hero-actions"><a data-cursor="see work ↘" className="button primary" href="#projects">see my work <span>↘</span></a><button data-cursor="say hi ♡" className="button outline" onClick={()=>openPopup({title:'hi :)',text:'You found the tiny popup. That means you are already doing a great job exploring.'})}>say hi</button></div><p className="scribble">currently: building things & figuring it out ♡</p></div>
    <div className="hero-board"><div className="blob blob-one"/><div className="blob blob-two"/><div className="mini-note note-one">good ideas<br/>take time<br/><span>♡</span></div><div className="mini-note note-two">code<br/>chess<br/>basketball<br/>& good food</div><div className="orbit-star">✦</div><div className="hero-center"><div className="abstract-avatar"><span>♡</span></div><p>same girl,<br/>different project.</p></div></div></section>

   <section id="about" className="section about-section"><div className="section-label"><span>01</span><span>a little about me</span></div><div className="about-layout"><div className="about-copy"><h2>a little<br/><em>about me.</em></h2><p>I'm a Computer Science student who likes turning random ideas into things people can actually use. I'm interested in software development, AI, cybersecurity, and anything that lets me be creative.</p><p>Outside of code, you'll probably find me playing 8 pool, watching <i>Stranger Things</i>, following basketball, building Legos, or looking for good food.</p><div className="interest-pills"><span>software development</span><span>AI</span><span>cybersecurity</span><span>8 pool</span><span>basketball</span><span>Legos</span></div></div>
    <div className="personal-board"><div data-cursor="terminal ›" className="terminal-card hover-pop" onClick={()=>openPopup({title:'terminal.exe',text:'it works on my machine.\n\nthis is not a bug.\nthis is a feature.\n\n...probably.'})}><div className="window-dots"><i/><i/><i/></div><div className="terminal-prompt">$ npm run <b>figure-it-out</b></div><div className="terminal-output">✓ compiling personality...<br/>✓ compiling questionable ideas...<br/><strong>done.</strong></div></div><button data-cursor="stranger 👾" className="upside-card hover-pop" onClick={()=>openPopup({title:'currently avoiding...',text:'the Upside Down.\n\nI have enough problems in this dimension, thank you very much.'})}><span>currently avoiding...</span><b>the Upside Down</b><small>👾</small></button><div data-cursor="stats ✦" className="stats-note hover-pop"><p>things i'm into:</p><div><span>💻 coding</span><b>always</b></div><div><span>🤖 AI + cybersecurity</span><b>yes</b></div><div><span>🎱 8 pool</span><b>competitive</b></div><div><span>🧱 LEGO + good food</span><b>essential</b></div><div><span>🏀 basketball</span><b>obviously</b></div></div></div></div></section>

   <section id="projects" className="section projects-section"><div className="section-label"><span>02</span><span>things i've built</span></div><div className="section-title-row"><div><h2>projects<span>☆</span></h2><p>a few things i've built (and survived).</p></div><span className="side-note">click one.<br/>i dare you →</span></div><div className="project-grid">{projects.map(project=><button data-cursor="view ↗" className={`project-card ${project.tone}`} key={project.name} onClick={()=>openPopup({title:project.name,text:project.details,stack:project.stack,url:project.url})}><div className="project-art">{project.image ? <img src={project.image} alt={`${project.name} project preview`} /> : <span>{project.tone==='pink'?'✿':project.tone==='brown'?'▦':'◌'}</span>}</div><div className="project-meta">{project.type}</div><h3>{project.name}</h3><p>{project.description}</p><div className="stack-row">{project.stack.map(item=><span key={item}>{item}</span>)}</div><div className="project-link">view details <span>↗</span></div></button>)}</div></section>

   <section id="fun" className="section fun-section"><div className="section-label"><span>03</span><span>fun stuff</span></div><div className="section-title-row"><div><h2>tiny nonsense<span>♡</span></h2><p>minimal on purpose. mildly chaotic by nature.</p></div></div><div className="fun-actions"><button data-cursor="click ♡" onClick={()=>openPopup({title:'a little motivation',text:'You do not need to have everything figured out before you start.\n\nStart messy. Make it better later. ♡'})}>a little motivation</button><button data-cursor="click ♡" onClick={()=>openPopup({title:'life update',text:'coding: yes\nbasketball: yes\nStranger Things: emotionally invested\nassignments: unfortunately also yes'})}>life update</button><button data-cursor="click ♡" onClick={()=>openPopup({title:'⚠ demmy.exe',text:'are you sure you want to make this website worse?\n\nthis action has absolutely no benefit whatsoever.' ,worsePrompt:true})}>make the website worse</button></div>
    <div className="fun-grid"><div className="currently-card paper-card"><span className="card-kicker">currently...</span><ul><li>building things</li><li>listening to music</li><li>playing 8 pool</li><li>watching basketball</li><li>trying my best ♡</li></ul></div><div className="playlist-card paper-card"><span className="card-kicker">currently playing ♫</span><div className="music-line"><span>♫</span><div><b>{spotifyTrack.title}</b><small>{spotifyTrack.artist}</small></div></div><div className="fake-player"><i/><i/><i/></div><a data-cursor="listen ♫" className="spotify-link" href={spotifyTrack.url} target="_blank" rel="noreferrer">listen on spotify ↗</a></div><div className="note-pop paper-card"><span className="card-kicker">a note to self</span><p>progress over perfection.</p><small>— future Demmy</small></div></div></section>

   <section id="contact" className="section contact-section"><div className="section-label"><span>04</span><span>let's talk</span></div><div className="contact-layout"><div><h2>let's make<br/><em>something cool.</em></h2><p>Tech, projects, opportunities, basketball arguments, or just random thoughts — I'm always down to chat.</p></div><div className="contact-links"><a href="mailto:hello@example.com">email me <span>↗</span></a><a href="https://www.linkedin.com/in/oluwademilade-kolade/?isSelfProfile=true" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="https://github.com/matildakolade-commits" target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div></div></section>
  </main>
  <footer><div className="footer-logo">Demmy<span>☆</span></div><p>made with ♡, caffeine, and questionable decisions.</p><button data-cursor="secret ?" onClick={()=>{setSecret(secret+1);openPopup({title:secret>=2?'okay you found it':'psst...',text:secret>=2?'You clicked the footer three times. Congratulations. There is absolutely no prize.':'there may or may not be a tiny secret here.'})}}>don't mind me</button></footer>
  {popup&&<div className="modal-backdrop" onClick={()=>setPopup(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button data-cursor="close ×" className="modal-close" onClick={()=>setPopup(null)}>×</button><span className="modal-kicker">demmy.exe</span><h3>{popup.title}</h3><p>{popup.text}</p>{popup.stack&&<div className="modal-stack">{popup.stack.map(item=><span key={item}>{item}</span>)}</div>}{popup.url&&<a data-cursor="open ↗" className="modal-live" href={popup.url} target="_blank" rel="noreferrer">view live project ↗</a>}{popup.worsePrompt?<div className="worse-buttons"><button data-cursor="okay ♡" className="modal-ok" onClick={()=>{setWorse(true);setPopup({title:'website successfully made worse ✓',text:'unfortunately, it is kind of better now.\n\nI have no explanation for this.'})}}>yes</button><button data-cursor="chaos ✦" className="modal-ok secondary" onClick={()=>{setWorse(true);setPopup({title:'obviously.',text:'you chose chaos.\n\nrespect.'})}}>obviously</button></div>:<button data-cursor="okay ♡" className="modal-ok" onClick={()=>setPopup(null)}>okay, cute.</button>}</div></div>}
 </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
