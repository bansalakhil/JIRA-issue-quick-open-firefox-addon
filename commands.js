var kMillisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
var kOneWeekAgo = (new Date).getTime() - kMillisecondsPerWeek;
var kFourWeekAgo = (new Date).getTime() - (kMillisecondsPerWeek * 4);

browser.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);

    if (command === "open-in-jira-popup") {
        jiraPopup();
    }

    if (command === "open-in-jira") {
        openInJira();
    }

});


// when user enter query in omnibox
browser.omnibox.onInputEntered.addListener(function(input) {
    if (input) {
        openIssueInJira(input, true);
    }
})


// when user is typing in omnibox
browser.omnibox.onInputChanged.addListener(
    function(text, suggest) {

        var query = "atlassian.net " + text;
        var gettingSuggestions = browser.history.search({
            text: query,
            startTime: kFourWeekAgo
        });
        gettingSuggestions.then(function(items) {

            var suggestions = [];

            for (var i = items.length - 1; i >= 0; i--) {
                suggestions.push({
                    content: items[i].url,
                    description: items[i].title
                })
            }
            suggest(suggestions);
        })

    });
