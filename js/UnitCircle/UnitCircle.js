Game.UnitCircle = function(game) {};

Game.UnitCircle.prototype = {
    create:function() {
        // this.stage.backgroundColor = '#3A5963';
        // Enable mouse click events
        this.game.input.mouse.capture = true;
        var numbers;
        var score = 0;
        var equation;
        this.answer_indices = [];
        this.degrees = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
        this.cosines = ["1", "√3/2", "√2/2", "1/2", "0", "-1/2", "-√2/2", "-√3/2", "-1", "-√3/2", "-√2/2", "-1/2", "0", "1/2", "√2/2", "√3/2"];
        this.sines = ["0", "1/2", "√2/2", "√3/2", "1", "√3/2", "√2/2", "1/2", "0", "-1/2", "-√2/2", "-√3/2", "-1", "-√3/2", "-√2/2", "-1/2"];

        //  Background
        bg = this.add.sprite(0, 0, 'bg');
        bg.scale.setTo(0.125, 0.125);
        bg.y += this.world.height/2.

        // Unit Circle
        this.unit_circle = this.add.sprite(this.world.width/2., this.world.height/2., 'unit_circle');
        this.unit_circle.scale.setTo(0.75, 0.75);
        this.unit_circle.x -= this.unit_circle.width/2.;
        this.unit_circle.y -= this.unit_circle.height/2.;

        // Angle line
        this.angle_line = this.add.sprite(this.world.width/2., this.world.height/2., 'angle');
        this.angle_line.anchor.setTo(0.5, 1);

        // Problem text
        this.problem_text = this.add.text(this.world.width/2., this.world.height/8., "sin(θ) = ", {
            font: "30px Arial",
            fill: "#000000",
            align: "center"
        });
        this.problem_text.anchor.setTo(0.5, 0.5);

        // Solution text?
        // 30 px Arial
        this.no_icon = this.add.sprite(this.problem_text.x - this.problem_text.width -50, this.problem_text.y, 'no');
        this.no_icon.anchor.setTo(0.5, 0.5);
        this.no_icon.visible = true;

        this.yes_icon = this.add.sprite(this.problem_text.x - this.problem_text.width -50, this.problem_text.y, 'yes');
        this.yes_icon.anchor.setTo(0.5, 0.5);
        this.yes_icon.visible = false;

        // Degrees text
        this.degrees_text = this.add.text(this.world.width*.8, this.world.height/8., "Angle: ", {
            font: "30px Arial",
            fill: "#000080",
            align: "center"
        });
        this.degrees_text.anchor.setTo(0.5, 0.5);
    },


    update: function () {
        this.angle_line.angle += 0.3;
        this.updateAngleText();
    },


    render: function() {
        this.game.debug.spriteInfo(this.angle_line, 40, 170);
        this.game.debug.text("Left Button: " + this.game.input.activePointer.isDown, 300, 132);
    },


    wrapPlatform: function (platform) {
        // Half of platform width
        if (platform.y < 250) {
            platform.body.velocity.y = 100;
        } else if (platform.y > 450) {
            platform.body.velocity.y = -100;
        }
    },


    updateAngleText: function () {
        if (this.game.input.activePointer.isDown) {
            var angle = -Phaser.Math.roundTo(this.angle_line.angle, 0) + 90;
            if (angle < 0) {
                angle += 360;
            }
            var final_value = this.closest(angle, this.degrees);
            this.problem_text.setText("sin(" + final_value.toString() + "°) = -√3/2");
            // this.yes_icon.visible = this.no_icon.visible;
            // this.no_icon.visible = !this.no_icon.visible;
            var solution_index = this.degrees.indexOf(final_value);
            console.log(solution_index);
        } else {
            this.problem_text.setText("sin(θ) = -√3/2");
        }
    },


    closest: function (num, arr) {
        var curr = arr[0];
         var diff = this.mathAbs (num - curr);
         for (var val = 0; val < arr.length; val++) {
             var newdiff = this.mathAbs (num - arr[val]);
             if (newdiff < diff) {
                 diff = newdiff;
                 curr = arr[val];
             }
         }
         return curr;
    },


    mathAbs: function(x) {
      x = +x;
      return (x > 0) ? x : 0 - x;
    },


}
