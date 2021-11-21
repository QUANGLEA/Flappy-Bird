$(function () {
    // Declaring Objects
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score = $('#score');

    // Convert Object Information into Integer
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var speed = 10; 

    // In-Game Status
    var go_up = false;
    var score_updated = false;
    var game_over = false;

    // Function to Start Game
    function playGame() {
        // Realtime for Game 
        var the_game = setInterval(function () {
            if (collision(bird, pole_1) || // If Bird collides with the top pole
                collision(bird, pole_2) || // Or Bird collides with the lower pole
                parseInt(bird.css('top')) <= 0 || // Or Bird collides with the top frame
                parseInt(bird.css('top')) > container_height - bird_height // Or Bird collides with the bottom frame
                )
            {
                stop_the_game(); // Stop Game Function
            }
            else
            {
                // Get Current Position of Pole
                var pole_current_position = parseInt(pole.css('right'));
                // Update Score when Bird Passes One Pair of Poles
                if (pole_current_position > container_width - bird_left)
                {
                    if (score_updated === false)
                    {
                        score.text(parseInt(score.text()) + 1); // Add 1 point
                        score_updated = true;
                    }
                }

                // Check If Pole has gone off Screen
                if (pole_current_position > container_width) {
                    var new_height = parseInt(Math.random() * 100); 
                    // Create Random Pole Height
                    pole_1.css('height', pole_initial_height + new_height);
                    pole_2.css('height', pole_initial_height - new_height);
                    score_updated = false;
                    pole_current_position = pole_initial_position; // Set current position to initial position
                }

                // Move Pole
                pole.css('right', pole_current_position + speed);

                // If no control for up 
                if (go_up === false) {
                    go_down(); // Bird Fall Down Function 
                }
            }
        }, 40);
    }

    // When Releasing Mouse Press
    $('#container').mouseup(function (e) {    
        clearInterval(go_up); // Delete Realtime go up of Bird 
        go_up = false;
    });

    // When Click Play Game Button
    $('#container').mousedown(function (e) {
        go_up = setInterval(up, 40); // Realtime go up for Bird
    });

    // When Click Play Game Button
    $('#play_btn').click(function() {
         playGame(); // Start Game Function
         $(this).hide(); // Hide Play Game Button
    });    

    // Bird Falling Function
    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 10);
        bird.css('transform', 'rotate(50deg)'); // Tilt Bird Object by 50 Degrees
    }

    // Bird Fly Up Function 
    function up() {
        bird.css('top', parseInt(bird.css('top')) - 20);
        bird.css('transform', 'rotate(-10deg)'); // Tilt Bird Object by -10 Degrees
    }

    // Lose Function 
    function stop_the_game() {
        clearInterval(playGame()); // Delete Realtime Game 
        game_over = true;
        $('#restart_btn').slideDown(); // Play Button shows
    }

    // When Click Replay Button
    $('#restart_btn').click(function () {
        location.reload(); // Reload Page
    });

    // Collision Between Objects Function 
    function collision($div1, $div2) {
        // Declare Object Variables 
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        // If Collision Happens 
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
            return false;
        }
        // No Collision
        else
        {
            return true;
        }
    }
});
