$(document).ready(function () {

    // This array will hold all the buttons you will want to add to search for GIFs
    var sports = ["Tom Brady", "Kobe Bryant", "Lebron James", "Peyton Manning", "Jerry Rice"];

    //We will create the initial buttons once the page loads
    for (i = 0; i < sports.length; i++) {
        //grab the text that the button will contain
        var name = sports[i];
        console.log(name);

        //create the buttons and append to gif-buttons id in html
        var gifButton = $("<button>").text(name);
        gifButton.addClass("btn btn-warning buttons d-inline b-created");
        gifButton.attr("id", name);

        $("#gif-buttons").append(gifButton);

    }

    //When a new search option is done, add the text as a button
    $("#submit-btn").on("click", function () {

        //Make page to not refresh
        event.preventDefault();

        //Get the text of the search
        var newButton = $("#search-gif").val().trim();
        console.log(newButton);

        //Add the text to the sport array
        sports.push(newButton);
        console.log(sports);

        //Have the search return to black
        $("#search-gif").val("");

        //remove the previous buttons that were created
        $(".b-created").remove();

        //Create buttons just like we did it when the page was loaded with the new string added to the array
        for (i = 0; i < sports.length; i++) {
            //grab the text that the button will contain
            var name = sports[i];
            console.log(name);

            //create the buttons and append to gif-buttons id in html
            var gifButton = $("<button>").text(name);
            gifButton.addClass("btn btn-warning buttons d-inline b-created");
            gifButton.attr("id", name);

            $("#gif-buttons").append(gifButton);
        }
    });

    //When a gif button is clicked show the gifs for that sports person
    $("#gif-buttons").on("click", ".b-created", function () {

        //Delete the previous gifs that were showing
        $(".gifs-created").remove();

        //Get the text (or id in this case since it's named the same) of the button
        var buttonText = $(this).text();
        console.log(buttonText);

        //Have your API key and query URL in variables
        var APIkey = "Y7tPU1SmBzLldu4qVGc6fmEJGmpVVMlK";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonText + "&api_key=" + APIkey + "&limit=10";

        //do the ajax call for the specific sports person
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            //loop to create the 10 gifs
            for (i = 0; i < response.data.length; i++) {

                //get the rating
                var rating = response.data[i].rating;
                console.log(rating);

                //get the gif url
                var gifUrl = response.data[i].images.original.url;
                console.log(gifUrl);

                //create div and append to "gifs" id in html
                var gifDiv = $("<div>");
                gifDiv.addClass("row col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 gifs-created");

                var rating = $("<p>").text("rating " + rating);
                rating.addClass("row col-12");

                gifDiv.append(rating);

                var gif = $("<img>").attr("src", gifUrl);
                gif.addClass("row col-12 gif")

                gifDiv.append(gif);

                $("#gifs").append(gifDiv);

            }


        });

    });
});