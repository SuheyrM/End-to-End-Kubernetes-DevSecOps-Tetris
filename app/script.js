const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

const COLS = 12, ROWS = 20, SIZE = 20;
canvas.width = COLS * SIZE;
canvas.height = ROWS * SIZE;

const colors = {
  I:"#22d3ee", O:"#facc15", T:"#a855f7", S:"#22c55e", Z:"#ef4444", J:"#3b82f6", L:"#f97316"
};

const shapes = {
  I:[[1,1,1,1]],
  O:[[1,1],[1,1]],
  T:[[0,1,0],[1,1,1]],
  S:[[0,1,1],[1,1,0]],
  Z:[[1,1,0],[0,1,1]],
  J:[[1,0,0],[1,1,1]],
  L:[[0,0,1],[1,1,1]]
};

const grid = Array.from({length: ROWS}, () => Array(COLS).fill(null));

let score = 0;
let piece = spawn();
let dropCounter = 0;
let lastTime = 0;

function spawn() {
  const keys = Object.keys(shapes);
  const type = keys[Math.floor(Math.random()*keys.length)];
  const shape = shapes[type].map(r => r.slice());
  return { type, shape, x: Math.floor(COLS/2) - Math.ceil(shape[0].length/2), y: 0 };
}

function rotate(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
}

function collide(p) {
  for (let y=0; y<p.shape.length; y++) {
    for (let x=0; x<p.shape[y].length; x++) {
      if (!p.shape[y][x]) continue;
      const gx = p.x + x, gy = p.y + y;
      if (gx < 0 || gx >= COLS || gy >= ROWS) return true;
      if (gy >= 0 && grid[gy][gx]) return true;
    }
  }
  return false;
}

function merge(p) {
  for (let y=0; y<p.shape.length; y++) {
    for (let x=0; x<p.shape[y].length; x++) {
      if (p.shape[y][x]) {
        const gy = p.y + y, gx = p.x + x;
        if (gy >= 0) grid[gy][gx] = p.type;
      }
    }
  }
}

function clearLines() {
  let cleared = 0;
  for (let y=ROWS-1; y>=0; y--) {
    if (grid[y].every(v => v)) {
      grid.splice(y,1);
      grid.unshift(Array(COLS).fill(null));
      cleared++;
      y++;
    }
  }
  if (cleared) {
    score += cleared * 100;
    scoreEl.textContent = String(score);
  }
}

function drop() {
  piece.y++;
  if (collide(piece)) {
    piece.y--;
    merge(piece);
    clearLines();
    piece = spawn();
    if (collide(piece)) gameOver();
  }
  dropCounter = 0;
}

function gameOver() {
  alert(`Game Over! Score: ${score}`);
  for (let y=0; y<ROWS; y++) grid[y].fill(null);
  score = 0; scoreEl.textContent = "0";
  piece = spawn();
}

function drawCell(x,y,type) {
  ctx.fillStyle = colors[type];
  ctx.fillRect(x*SIZE, y*SIZE, SIZE, SIZE);
  ctx.strokeStyle = "rgba(0,0,0,.2)";
  ctx.strokeRect(x*SIZE, y*SIZE, SIZE, SIZE);
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      if (grid[y][x]) drawCell(x,y,grid[y][x]);
    }
  }
  for (let y=0; y<piece.shape.length; y++) {
    for (let x=0; x<piece.shape[y].length; x++) {
      if (piece.shape[y][x]) drawCell(piece.x+x, piece.y+y, piece.type);
    }
  }
}

function update(time=0) {
  const delta = time - lastTime;
  lastTime = time;
  dropCounter += delta;
  if (dropCounter > 600) drop();
  draw();
  requestAnimationFrame(update);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") { piece.x--; if (collide(piece)) piece.x++; }
  if (e.key === "ArrowRight") { piece.x++; if (collide(piece)) piece.x--; }
  if (e.key === "ArrowDown") drop();
  if (e.key === "ArrowUp") {
    const old = piece.shape;
    piece.shape = rotate(piece.shape);
    if (collide(piece)) piece.shape = old;
  }
});

update();
