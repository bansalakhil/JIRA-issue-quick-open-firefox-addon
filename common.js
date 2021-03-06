function jiraPopup(tab) {

    var jira_url, project_key;

    var gettingJiraInfo = browser.storage.sync.get(['project_key', 'jira_url']);
    gettingJiraInfo.then(function(items) {
        jira_url = items.jira_url;
        project_key = items.project_key;


        if (jira_url && project_key) {
            var issue_id = prompt(jira_url + "\n\nPlease enter the issue id (" + project_key + "-43) or 43:")
            if (issue_id) {
                openIssueInJira(issue_id)
            }

        } else {
            alert("Please set jira url and default project key from extension options section.");
            browser.runtime.openOptionsPage();
        }
    });

}


function openInJira(info, tab) {
    var gettingSelection = browser.tabs.executeScript({
        code: "window.getSelection().toString();"
    });
    gettingSelection.then(function(selection) {
        console.log('ak')
        console.log(selection[0])
        openIssueInJira(selection[0]);

    });
}


function openIssueInJira(selection, current_tab) {
    debugger
    selection = selection.toString();

    // if it is a url then open the url as it is
    if (selection.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)) {
        browser.tabs.update({
            url: selection
        });
        return;
    }

    selection = selection.replace(/\s+/g, '-').toLowerCase();

    var gettingJiraInfo = browser.storage.sync.get(['project_key', 'jira_url']);
    gettingJiraInfo.then(function(items) {

        if (items.jira_url && items.project_key) {
            var url;


            if (selection.match(/^\d+$/g)) {
                // if numeric value is selected the open in default project
                url = items.jira_url + "/browse/" + items.project_key + '-' + selection;

            } else if (selection.match(/^[A-Za-z]+-[0-9]+$/g)) {
                // if selection matches with string-number
                url = items.jira_url + "/browse/" + selection;
            } else {
                alert("Invalid Issue ID. \n\nSelection should be like 'key-123'.");
                return false;

            }

            // if current_tab is true then open issue in current tab else open in new tab.
            if (current_tab) {
                browser.tabs.update({
                    url: url
                });

            } else {
                browser.tabs.create({
                    url: url
                });
            }

        } else {
            // If options were not set the show alert.
            alert("Please set jira url and default project key from extension options section.");
            browser.runtime.openOptionsPage();
        }

    });


}
