var queryURL;
var altButtons = [];
var array = ["Batman", "Spiderman", "Aquaman", "Iron Man", "Hulk"];

//The function that takes in the value of the input box and creates the gifs on screen + the button 
var createGifs = function(item){
    var cantExist = true;
    var newButton = $("<button>");
    newButton.html(item);
    newButton.attr("style", "margin-left:5px")
    newButton.attr("data-attribute", item)
        

    for (var i = 0; i < altButtons.length; i++){
        if (altButtons[i] == item){
            cantExist = false;
        }
    }

    if (cantExist) {
        $("#Searches").append(newButton);
        $(".btn-danger").removeClass("btn-danger");
        $(newButton).addClass("btn-danger");
        altButtons.push(item);
    };

    newButton.on("click", function(){
        $(".btn-danger").removeClass("btn-danger");
        $(this).addClass("btn-danger");
            
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=0AR5GTU0DNZHFiBV0ghK6NtQGow2DgcY&limit=10";

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
                
            
        $("#mainWindow").html("");
        
            for (var i = 0; i < 10; i ++){
                var newGif = $("<img>");
                newGif.attr("data-animate", response.data[i].images.fixed_width_small.url);
                newGif.attr("data-still", response.data[i].images.fixed_width_small_still.url);
                newGif.attr("data-state", "still");
                newGif.attr("src", response.data[i].images.fixed_width_small_still.url);
                newGif.attr("style", "padding-bottom: 30px; height: 125px; width: 150px");
                
            newGif.on("click", function(){
                if ($(this).attr("data-state") == "still"){
                    $(this).attr("data-state","animate");
                    $(this).attr("src", $(this).attr("data-animate"));
                } else {
                    $(this).attr("data-state","still");
                    $(this).attr("src", $(this).attr("data-still"));

                }
            })
                $("#mainWindow").append(newGif);
                $("#mainWindow").append("<span style=\"position: relative; top:45px; right: 115px; text-align: center\">Rating: " + response.data[i].rating + "</span>");
                $("#mainWindow").append("  ");
            };
        });

    });

        if (cantExist){
            queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=0AR5GTU0DNZHFiBV0ghK6NtQGow2DgcY&limit=10";

                $.ajax({
                url: queryURL,
                method: "GET"
                }).then(function(response) {
                    
                $("#mainWindow").html("");
                
                for (var i = 0; i < 10; i ++){
                    var newGif = $("<img>");
                    newGif.attr("data-animate", response.data[i].images.fixed_width_small.url);
                    newGif.attr("data-still", response.data[i].images.fixed_width_small_still.url);
                    newGif.attr("data-state", "still");
                    newGif.attr("src", response.data[i].images.fixed_width_small_still.url);                 
                    newGif.attr("style", "padding-bottom: 30px; height: 125px; width: 150px");

                    newGif.on("click", function(){
                        if ($(this).attr("data-state") == "still"){
                            $(this).attr("data-state","animate");
                            $(this).attr("src", $(this).attr("data-animate"));
                        } else {
                            $(this).attr("data-state","still");
                            $(this).attr("src", $(this).attr("data-still"));

                        }
                    })

                    $("#mainWindow").append(newGif);
                    $("#mainWindow").append("<span style=\"position: relative; top:45px; right: 115px; text-align: center\">Rating: " + response.data[i].rating + "</span>");
                    $("#mainWindow").append("");
                }
            });
        };
};


$(document).ready(function(){

    for (var i = 0; i < array.length; i++){
        createGifs(array[i]);
    }

    $("#add-gif").on("click", function(){
        
        createGifs($("#input").val());

    });
});
