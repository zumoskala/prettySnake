var canvas = document.querySelector(".canvas");
var canvas_context = canvas.getContext("2d");
var cell_size = 20;
var rows = canvas.height/cell_size;
var cols = canvas.width/cell_size;
var snake_segment = new Image();
snake_segment.src = "img/snake-icon.jpg";
var snake, apple;

function Snake() {
    this.x = 0;
    this.y = 0;
    this.score = 0;
    this.body = [];
    this.speed = cell_size;
    this.direction = "ArrowDown";

    this.draw = function () {
        for(i = 0; i < this.body.length; i++){
            canvas_context.drawImage(snake_segment, this.body[i].x, this.body[i].y, cell_size, cell_size);
        }
        canvas_context.drawImage(snake_segment,this.x, this.y, cell_size, cell_size);
    }

    this.update = function () {
        for(i = 0; i < this.body.length - 1; i++){
            this.body[i] = this.body[i+1];
        }
        this.body[this.score - 1] = {x: this.x, y: this.y };

        if(this.x > canvas.width) {
            this.x = 0;
        } else if(this.x < 0) {
            this.x = canvas.width;
        } else if(this.y < 0) {
            this.y = canvas.height;
        } else if(this.y > canvas.height) {
            this.y = 0;
        } else if(this.direction == "ArrowUp") {
            this.y -= this.speed;
        } else if(this.direction == "ArrowDown") {
            this.y += this.speed;
        } else if(this.direction == "ArrowLeft") {
            this.x -= this.speed;
        } else if(this.direction == "ArrowRight") {
            this.x += this.speed;
        }
    }

    this.eatsItself = function (){
        for(i = 0; i < this.body.length; i++){
            if(this.x === this.body[i].x && this.y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }
}

function snakeMove() {
    canvas_context.clearRect(0, 0, canvas.width, canvas.height);
    snake.update();
    apple.draw();
    snake.draw();

    if(snake.x == apple.x && snake.y == apple.y){
        apple.giveFood();
        snake.score ++;
    }
    console.log(snake.eatsItself())
    if(snake.eatsItself()){
        snake.score = 0;
        snake.body = [];
    }

    document.querySelector(".score").textContent = snake.score;
}

window.addEventListener("keydown", selectDirection);

function selectDirection(e) {
    snake.direction = e.key;
}

(function init_game() {
    snake = new Snake();
    apple = new Apple();

    apple.giveFood();
    console.log(apple);

    console.log("hi")
    var snake_speed = window.setInterval(snakeMove, 200);
}());
