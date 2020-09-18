var image = new Image();
image.src = 'img/apple.png';

function Apple() {
    this.x;
    this.y;


    this.giveFood = function (){
        this.y = (Math.floor(Math.random() * rows - 1) + 1) * cell_size;
        this.x = (Math.floor(Math.random() * cols - 1) + 1) * cell_size;
    }

    this.draw = function () {
        canvas_context.drawImage(image, this.x, this.y, cell_size, cell_size);
    }
}
