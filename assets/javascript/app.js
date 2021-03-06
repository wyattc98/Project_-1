// var config = {
//     apiKey: "AIzaSyD_HWz0DyW70i9wsEyKU0j8U-MEkzb0WCA",
//     authDomain: "walmart-list.firebaseapp.com",
//     databaseURL: "https://walmart-list.firebaseio.com",
//     projectId: "walmart-list",
//     storageBucket: "gs://walmart-list.appspot.com",
//     messagingSenderId: "49914300938",
// };

// var database = firebase.database();

// var musicEntry = database.ref().push({
//     "placeholder": "placeholder"
// });

// //https://console.firebase.google.com/u/0/project/walmart-list/database/walmart-list/data

$("#searchButton").on("click", function () {
    event.preventDefault();
    var musixAPIKey = "649aebb6c93238abb42f188056ea802a";
    var youTubeAPIKey = "AIzaSyCqNAG9PCjtgym4szadGM-KYmiWgrVYICM"
    var artist = $("#artist-name").val().trim()
    var song = $("#song-name").val().trim()
    var album = $("#album-name").val().trim()
    var searchValue = song + artist + album

    var youTubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=" + youTubeAPIKey + "&q=" + searchValue;

    $.ajax({
        url: "https://api.musixmatch.com/ws/1.1/track.search",
        dataType: "jsonp",
        data: {
            apikey: musixAPIKey,
            q_artist: artist,
            q_album: album,
            q_track: song,
        },
        success: padded_callback,
    });
    function padded_callback(response) {
        console.log(response);
        var mmResults = response.message.body.track_list;
        for (i = 0; i < mmResults.length; i++) {
            console.log(mmResults[i].track.lyrics_id);
            console.log("-----------");
        }
    }   

    $.ajax({
        url: youTubeURL,
        method: "GET"
    })
        .then(function (response) {
            var ytResults = response.items;
            console.log(response);
            $("#emptyDiv").text("");
            $("#emptyDiv").append("<h1 id='videoHeaderStyle'>Video Results:</h2>");
            for (j = 0; j < ytResults.length; j++) {
                var videoTitle = ytResults[j].snippet.title;
                var videoId = ytResults[j].id.videoId;
                var videoDescription = ytResults[j].snippet.description;
                if (videoDescription === "") {
                    var videoDescription = "[No Description Given]";
                }
                var videoLink = $("<a>").attr("href", "https://www.youtube.com/watch?v=" + videoId);
                videoLink.attr("target", "_blank");
                // videoLink.attr("permission", "allowed");
                // videoLink.attr("videoEmbeddable", true);
                // videoLink.attr("videoSyndicated", true);
                videoLink.text("https://www.youtube.com/watch?v=" + videoId);
                var videoThumbnail = ytResults[j].snippet.thumbnails.medium.url;
                var videoThumbnailTag = $("<img>").attr("src", videoThumbnail);
                // var videoPlayer = $("<iframe>").attr({
                //     src: "https://www.youtube.com/embed/" + videoId + "?rel=0",
                //     width: "560",
                //     height: "315",
                //     frameborder: "0",
                //     allow: "autoplay; encrypted-media",
                //     allowfullscreen: ""
                // })
                $("#emptyDiv").append(
                    $("<h2>").text(videoTitle),
                    $("<div>").append(videoLink),
                    $("<div>").append(videoThumbnailTag),
                    $("<br>"),
                    // $("<div class='loadingStyle'>").append(videoPlayer),
                    $("<div>").append("Description: " + videoDescription),
                    $("<br>"),
                    $("<hr>"),
                    $("<br>")
                );
            }
        })
});