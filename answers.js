$(document).ready( () => {
    $("#toggle-solution").click(function() {
        $(".solution-field").toggle('slow');
        $(this).text(function(i, text) {
            return text === "Hide Full Solution" ? "Show Full Solution" : "Hide Full Solution";
        })
    });
});