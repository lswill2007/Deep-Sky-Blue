var game = {
    data: [],  
    score: 0, 
    gamerunning: 1, 
    gameover: 0, 
    status: 1,

    start: function () {
        this.data = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        this.score = 0;
        this.status = this.gamerunning;
        this.randomNum();
        this.randomNum();
        this.randomNum();
        this.randomNum();
        this.randomNum();
        this.dataView();
    },
    randomNum: function () {
        while (true) {
            var r = Math.floor(Math.random() * 4);   //row
            var c = Math.floor(Math.random() * 4);   //column
            if (this.data[r][c] == 0) {
                var num = Math.random() > 0.2 ? 2 : 4; 
                this.data[r][c] = num;
                break;

            }

        }
    },
    dataView: function () {
        for (var r = 0; r < 4; r++) {  
            for (var c = 0; c < 4; c++) {
                var div = document.getElementById("n" + r + c); 
                if (this.data[r][c] != 0) {
                    div.innerHTML = this.data[r][c]; 
                    div.className = "cell n" + this.data[r][c];
                } else {
                    div.innerHTML = ""; 
                    div.className = "cell";
                }
            }
        }
        document.getElementById("score01").innerHTML = this.score;
        if (this.status == this.gameover) { 
            document.getElementById("gameover").style.display = "block";
            document.getElementById("score02").innerHTML = this.score;
        } else {  
            document.getElementById("gameover").style.display = "none";
        }
    },
    isgameove: function () {
        for (var r = 0; r < 4; r++) {
            for (var c = 0; c < 4; c++) {
                if (this.data[r][c] == 0) { 
                    return false;
                }
                if (c < 3) {  
                    if (this.data[r][c] == this.data[r][c + 1]) {
                        return false;
                    }
                }
                if (r < 3) {
                    if (this.data[r][c] == this.data[r + 1][c]) {
                        return false;
                    }
                }
            }
        }
        return true;//if this number is the same as its adjacent one or there's still blank 
    },
    moveLeft: function () {
        var before = String(this.data);
        for (var r = 0; r < 4; r++) {
            this.moveLeftinRow(r);
        }
        var after = String(this.data);

        if (before != after) {
            this.randomNum();
            if (this.isgameove()) { 
                this.status = this.gameover;
            }
            this.dataView();
        }

    },
    moveLeftinRow: function (r) {
        for (var c = 0; c < 3; c++) {
            var nextc = this.moveLeftNum(r, c);
            if (nextc != -1) {
                if (this.data[r][c] == 0) {  
                    this.data[r][c] = this.data[r][nextc];
                    this.data[r][nextc] = 0;
                    c--;

                }
                else if (this.data[r][c] == this.data[r][nextc]) {
                    this.data[r][c] *= 2;
                    this.data[r][nextc] = 0;
                    this.score += this.data[r][c];

                }
            } else {
                break;
            }
        }

    },
    moveLeftNum: function (r, c) {
        for (var i = c + 1; i < 4; i++) {
            if (this.data[r][i] != 0) {
                return i;
            }
        }
        return -1;
    },
    moveRight: function () {
        var before = String(this.data);
        for (var r = 0; r < 4; r++) {
            this.moveRightinRow(r);
        }
        var after = String(this.data);
        if (before != after) {
            this.randomNum();
            if (this.isgameove()) { 
                this.status = this.gameover;
            }
            this.dataView();
        }

    },
    moveRightinRow: function (r) {
        for (var c = 3; c >= 0; c--) {
            var nextc = this.moveRightNum(r, c);
            if (nextc != -1) {
                if (this.data[r][c] == 0) {
                    this.data[r][c] = this.data[r][nextc];
                    this.data[r][nextc] = 0;
                    c++;

                }
                else if (this.data[r][c] == this.data[r][nextc]) {
                    this.data[r][c] *= 2;
                    this.data[r][nextc] = 0;
                    this.score += this.data[r][c];

                }
            } else {
                break;
            }
        }

    },
    moveRightNum: function (r, c) {
        for (var i = c - 1; i >= 0; i--) {
            if (this.data[r][i] != 0) {
                return i;
            }
        }
        return -1;
    },
    moveUp: function () {

        var before = String(this.data);
        for (var c = 0; c < 4; c++) {
            this.moveUpinRow(c);
        }
        var after = String(this.data);
        if (before != after) {
            this.randomNum();
            if (this.isgameove()) {
                this.status = this.gameover;
            }
            this.dataView();
        }

    },

    moveUpinRow: function (c) {
        for (var r = 0; r < 3; r++) {

            var nextr = this.moveUpNum(r, c);
            if (nextr != -1) {
                if (this.data[r][c] == 0) { 
                    this.data[r][c] = this.data[nextr][c];
                    this.data[nextr][c] = 0;
                    r--;

                }
                else if (this.data[r][c] == this.data[nextr][c]) {
                    this.data[r][c] *= 2;
                    this.data[nextr][c] = 0;
                    this.score += this.data[r][c];

                }
            } else {
                break;
            }
        }

    },
    moveUpNum: function (r, c) {	
        for (var i = r + 1; i < 4; i++) {
            if (this.data[i][c] != 0) {
                return i;
            }
        }
        return -1;
    },
    moveDown: function () {
        var before = String(this.data);
        for (var c = 0; c < 4; c++) {
            this.moveDowninRow(c);
        }
        var after = String(this.data);
        if (before != after) {
            this.randomNum();
            if (this.isgameove()) { 
                this.status = this.gameover;
            }
            this.dataView();
        }

    },
    moveDowninRow: function (c) {
        for (var r = 3; r >= 0; r--) {
            var nextr = this.moveDownNum(r, c);
            if (nextr != -1) {
                if (this.data[r][c] == 0) {  
                    this.data[r][c] = this.data[nextr][c];
                    this.data[nextr][c] = 0;

                    r++;

                }
                else if (this.data[r][c] == this.data[nextr][c]) {
                    this.data[r][c] *= 2;
                    this.data[nextr][c] = 0;
                    this.score += this.data[r][c];

                }
            } else {
                break;
            }
        }

    },
    moveDownNum: function (r, c) {	
        for (var i = r - 1; i >= 0; i--) {
            if (this.data[i][c] != 0) {
                return i;
            }
        }
        return -1;
    }

}

document.onkeydown = function () {
    if (event.keyCode == 37) {  
        game.moveLeft();
    } else if (event.keyCode == 38) {  
        game.moveUp();
    } else if (event.keyCode == 39) { 
        game.moveRight();
    } else if (event.keyCode == 40) {  
        game.moveDown();
    }

}

game.start();
console.log(game.data)
console.log(game.score)

function typeonce() {
    document.getElementById("gameover").style.display = "none";
    window.location.href = "2048.html";
}