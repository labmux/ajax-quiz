//Run jQuery after the document is fully loaded.
$(document).ready(

    //The function that does the stuff.
    function () {
        //Make the AJAX call
        $.ajax('http://api.tvmaze.com/singlesearch/shows?q=the+magicians&embed=episodes', {
            method: "GET",
            dataType: "json"
        })
        //After the data comes back, use this function
            .done(
                function (data) {
                    //Add the name
                    $('#name').append(data.name);
                    //Add the episodes
                    data._embedded.episodes.forEach(function (episode) {
                        $('#episodeList').append('<tr>'+
                            '<td>' + episode.season + '</td>' +
                            '<td>' + episode.number + '</td>' +
                            '<td>' + episode.name + '</td>' +
                            '<td>' + episode.summary + '</td>' +
                            +' </tr>')
            })
        })
    },

    $('#search_btn').click(function (event) {
        //prevent reload
        event.preventDefault();

        //get search query
        var search_query = document.getElementById('search_query').value;
        //replace spaces with +
        search_query = search_query.replace(/\s+/g, '+');

        let ajax_call = 'http://api.tvmaze.com/singlesearch/shows?q=' + search_query + '&embed=episodes';

        //Make the AJAX call
        $.ajax(ajax_call, {
            method: "GET",
            dataType: "json"
        }).done(
                function (data) {
                    //Add the name
                    $('#name').empty().append(data.name);
                    //empty previous list
                    $('#episodeList').empty();

                    //display episodes
                    data._embedded.episodes.forEach(function (episode) {
                        $('#episodeList').append('<tr>'+
                            '<td>' + episode.season + '</td>' +
                            '<td>' + episode.number + '</td>' +
                            '<td>' + episode.name + '</td>' +
                            '<td>' + episode.summary + '</td>' +
                            +' </tr>')
                    })
                })
    })
)
