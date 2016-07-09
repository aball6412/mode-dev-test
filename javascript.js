$(document).ready(function() {
    
    
    
    //After document loads get the screen size
    var screen_width = $(document).width();
    
    //If screen size starts off as small then add the text logo to the header section
    //Also change button text to work better for smaller screens
    if (screen_width < 768) {
        
        $(".text_logo").removeClass("invisible");
        $(".nav_logo").addClass("invisible");
        $(".nav_links").addClass("col-xs-offset-6");
        
        $(".request_big").addClass("invisible");
        $(".request_sm").removeClass("invisible");
    }

    //If window gets resized then...
    $(window).resize(function() {
        
        //First see if user is scrolled
        var scroll = $(document).scrollTop();
        
        //Get the new screen width
        screen_width = $(document).width();
        
        //If new screen width is small then..
        if (screen_width < 768) {
            
            //Add the text logo to the header
            //Remove the text logo in the nav bar
            //Add offset class to nav links to keep its position in tact
            //Change button text for smaller screens
            $(".text_logo").removeClass("invisible");
            $(".nav_logo").addClass("invisible");
            $(".nav_links").addClass("col-xs-offset-6");
            
            $(".request_big").addClass("invisible");
            $(".request_sm").removeClass("invisible");
        }
        
        //If the screen is not small then..
        else {
            //Get rid of text logo, add back nav logo, and remove nav links class
            $(".text_logo").addClass("invisible");
            $(".nav_links").removeClass("col-xs-offset-6");
            
            //If user is scrolled then we don't want to add the nav logo back
            //Because it is supposed to be invisible
            if (scroll === 0) {
                $(".nav_logo").removeClass("invisible");
            }
            
            $(".request_big").removeClass("invisible");
            $(".request_sm").addClass("invisible");
        }
        
       //console.log($(document).width());
        
    }); //End screen resize event
    
    
    
    
    
    
    //When user scrolls update nav bar styling
    $(document).scroll(function() {

        //Get scroll variable
        var scroll = $(document).scrollTop();

        //If user has scrolled down at all then change styling
        if (scroll >= 1) {
            
            //Change the nav holder styling background
            $(".nav_holder").css(
                {
                    "background-color": "rgb(45, 45, 45)"
                });
            
            //Give holder div height so that rest of the page doesn't move upwards
            //due to nav bar now being "fixed"
            $(".holder_div").css(
                {
                    "height": "75px"
                });
            
            
            //Make the email button and dyanmic logo display on page by removing invisible class
            $(".nav_email_button").removeClass("invisible");
            $(".dynamic_nav_logo").removeClass("invisible");
            
            //Make the original nav links invisible
            $(".nav_links").addClass("invisible");
            $(".nav_logo").addClass("invisible");
            
            
        } //End if statement
        
        
        //If scroll is returned back to the top then reset styling back to original state
        if (scroll === 0) {
            
            //Set nav bar background back to original color
            $(".nav_bar, .nav_holder").css(
                {
                    "background": "none"
                });
            
            //Make the dynamic nav bar elements invisible again
            $(".nav_email_button").addClass("invisible");
            $(".dynamic_nav_logo").addClass("invisible");
            
            //Make the original nav bar elements visible again
            //If screen size is NOT small
            $(".nav_links").removeClass("invisible");
            if (screen_width > 768) {
                $(".nav_logo").removeClass("invisible");
            }
            
            
        } //End if statement
        
    }); //End of scroll event
    
    
    
    
    
    
    
    
    $(".main_img, .main_img_hover").hover(
        function() {
                
            var id = $(this).attr("id");
            
            //Get the screenshot text box sibling
            var sibling = $(this).siblings()[1].id;
            
            //Get the plus sibling
            var plus_sibling = $(this).siblings()[0].id

            
            var url = "./images/screenshot.png";
            var background = "url(./images/" + id + ".png)"; 

            $(this).css(
                {
                    "cursor": "pointer",
                    "border": "solid",
                    "border-color": "#ffffff",
                    "border-width": "5px",
                    "background-size": "cover",
                    "background-repeat": "no-repeat",
                    "background-image": background   
                });

            $(this).attr("src", url);

            $("#" + sibling).css(
                {
                    "opacity": "1"
                });
            
            //Add background color for plus
            $("#" + plus_sibling).css("background", "#9f9f9f");
 
        },
        
        function() {
            
            //Get the element ID
            var id = $(this).attr("id");
            var plus_sibling = $(this).siblings()[0].id;
 
            //Get rid of the background
            $(this).css(
                {
                    "background": "none",
                    "border": "none"
                });

            //Change the image back to the original one
            var url = "./images/" + id + ".png";
            $(this).attr("src", url);

            //Make screenshot text invisible again
            $(".main_img_hover").css(
                {
                    "opacity": 0
                });
            
            //Turn plus background color back
            $("#" + plus_sibling).css("background", "none");
                   
        }); //End hover event
    
    
    
   
    
    
    //If the user clicks on one of the apps then display the light box
    $(".main_img").click(function() {
        $(".lightbox, .exit_box, .lightbox_shadow").removeClass("invisible");
    });
    
    //If user clicks on the "CLOSE X" button then then make light box invisible
    $(".close_box").click(function() {
        $(".lightbox, .exit_box, .lightbox_shadow").addClass("invisible");   
    });
    
    //If user clicks outside of the lightbox while it's open then close the light box
    $(".lightbox_shadow").click(function() {
        $(".lightbox, .exit_box, .lightbox_shadow").addClass("invisible");
    });
    
    
    
    
    
    
    //When "Request Invite" button is pressed
    $(".email_button, .error_button").click(function() {
        
        //Get email address from the field
        var email_address = $(".email input").val();
        var timestamp = Date.now();
        console.log(timestamp);
        
        var info = { email_address: email_address, timestamp: timestamp };
        

        //Validate email address
        var email_validator = function(email) {
            
            var regex = new RegExp(/^([a-zA-Z0-9+.-_])+\@+([a-zA-Z0-9]+\.)+([a-zA-Z0-9]{1,5})+$/);
            
            return regex.test(email);
        }
        
        var validate = email_validator(email_address);
        
        if (validate) {
        
            //Send address to server for processing
            $.post("http://localhost:8888/signup.php", info, function(data) {

                console.log(data);

                if(data === "Success") {

                    //SUCCESS RESPONSE FROM THE SERVER
                    //Get rid of original button and add the success button (nav bar too)
                    $(".email_button").addClass("invisible");
                    $(".error_button").addClass("invisible"); ////////////
                    $(".success_button").removeClass("invisible");
                    $(".nav_email_button").css(
                        {
                            "background-image": "url('./images/success_button.png')",
                            "background-size": "cover",
                            "background-repeat": "no-repeat"
                        });
                    $(".nav_big").remove();
                    $(".nav_sm").remove();
                    $(".nav_success").removeClass("invisible");


                    //Display the success confirmation
                    $(".confirmation").removeClass("invisible");
                    $(".failure_duplicate").addClass("invisible");
                    $(".failure_invalid").addClass("invisible");
                    $(".email input").css("color", "#000000");

                    //Re do the margins in the document
                    $(".email_box").css("margin-bottom", "15px");
                    $(".confirmation").css("margin-bottom", "75px");

                }

                else if (data === "Duplicate") {

                    //FAILURE RESPONSE FROM THE SERVER DUPLICATE EMAIL ADDRESS
                    //Get rid of original button and add the error button (nav bar too)
                    //Turn input text red
                    $(".email_button").addClass("invisible");
                    $(".error_button").removeClass("invisible");
                    $(".email input").css("color", "#ff0000");
                    $(".nav_email_button").css(
                        {
                            "background-image": "url('./images/error_button.png')",
                            "background-size": "cover",
                            "background-repeat": "no-repeat"
                        });

                    //Display the error text
                    $(".failure_invalid").addClass("invisible");
                    $(".failure_duplicate").removeClass("invisible");

                    //Re do the margins in document
                    $(".email_box").css("margin-bottom", "15px");
                    $(".failure_duplicate").css("margin-bottom", "75px");

                }

            }); //End POST
        
        
        } //End validate
        
        else {
            
            //FAILURE RESPONSE FROM THE SERVER INVALID EMAIL ADDRESS

            //Get rid of original button and add the error button
            //Turn input text red
            $(".email_button").addClass("invisible");
            $(".error_button").removeClass("invisible");
            $(".email input").css("color", "#ff0000");
            $(".nav_email_button").css(
                        {
                            "background-image": "url('./images/error_button.png')",
                            "background-size": "cover",
                            "background-repeat": "no-repeat"
                        });

            //Display the error text
            $(".failure_invalid").removeClass("invisible");
            $(".failure_duplicate").addClass("invisible");

            //Re do the margins in document
            $(".email_box").css("margin-bottom", "15px");
            $(".failure_invalid").css("margin-bottom", "75px");
            
        } //End else
        
        
        
        
        
        
        
        
        
        
        
    }); //End email button click
        
        

    
    
    
    
    

    
}); //End of entire script