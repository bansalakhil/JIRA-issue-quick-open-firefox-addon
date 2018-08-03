// Saves options to browser.storage
function save_options() {
    var project_key = document.getElementById('project_key').value;
    var jira_url = document.getElementById('jira_url').value;
    var recent_count = document.getElementById('recent_count').value;

    var settingJiraInfo = browser.storage.sync.set({
        recent_count: recent_count || 10,
        project_key: project_key,
        jira_url: jira_url
    });
    settingJiraInfo.then(function() {

        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 2000);
    });
}

// Restores preferences
// stored in browser.storage.
function restore_options() {
    // Use default value project_key = 'red' and jira_url = true.
    var gettingJifaInfo = browser.storage.sync.get(['project_key', 'jira_url', 'recent_count'])
    gettingJifaInfo.then(function(items) {
        document.getElementById('project_key').value = items.project_key;
        document.getElementById('jira_url').value = items.jira_url;
        document.getElementById('recent_count').value = items.recent_count;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('save').addEventListener('click',
        save_options);
});
