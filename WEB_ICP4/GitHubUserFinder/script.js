function getGithubInfo(userName) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)
    $.ajax({
        "url": "https://api.github.com/users/" + userName,
        "type": 'GET',
        "success": function (response) {
            displayUser(response);
        },
        "fail": noSuchUser(userName),
    });
}
/* $.get("https://api.github.com/users/" + user, function (data) {
   showUser(data);
 }).fail(function() {
     noSuchUser(user);
 })*/


function displayUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    $(".userImage").show();
    $(".details").show();
    $("#profile h1").text(user.login);
    $(".userImage img").attr("src", user.avatar_url);
    $("#Username").text(user.name == null ? "Unknown" : user.name);
    $("#UserId").text(user.id);
    $("#gitURL").attr("href", user.html_url);
    $("#followersCount").text(user.followers);
    $("#AccountGeneration").text(user.created_at);
    console.log($("#gitURL").attr("href"));
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $("#profile h1").text(username + " NOT FOUND");
    $(".userImage").hide();
    $(".details").hide();

}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        let username;
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            getGithubInfo(username);
            //if the response is successful show the user's details
        }
    })
});