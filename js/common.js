var repoPath = "https://github.com/ieee-vgtc/ieeevis.org/";

// --------------------------------------------------------------------------------
// read the config file and alter the text on the websites (config/config.json)
// things still need to be updated manually
// 1. _header.html (title etc.)
// 2. any descriptions of the program, tasks, or others
// 3. t-shirt contest voting
// --------------------------------------------------------------------------------
config_index = 2 // use which entry in the config file; for 2018 it is 0

d3.json("../config/config.json", function (err, config) {
    if (err) console.log(err)
    config_info = config[config_index]
    // console.log(config_info)

    // update common informatio
    // which year? 
    d3.selectAll(".config_year")
        .text(config_info.year)

    d3.selectAll(".config_previous_year")
        .text(+config_info.year - 1)

    // the link to apply
    d3.selectAll(".config_apply_link")
    .attr("link:href", config_info.apply_link)

    // the number of the chairs
    // selection.html
    d3.selectAll(".config_num_chairs")
    .text(config_info.chairs.length)

    // the names of the chairs
    // selection.html index.html
    d3.selectAll(".config_chairs") // should be a div
    .html(function(){
        var str = "<br><br>"
        config_info["chairs"].forEach(ch => {
            str += ch.name + ", <i>" + ch.affiliation + "</i><br>";
        })
        return str
    })

    // ------------------
    // updating jobs.html
    // where the vis conference is?
    d3.selectAll(".config_location")
        .text(config_info.location)

    // where is the sv room
    // if we have known
    if (config_info.config_sv_room)
        d3.selectAll(".config_sv_room")
        .text(config_info.sv_room)

    // the starting date
    d3.selectAll(".config_conf_start_date")
        .text(config_info.conf_start_date)

    // the time of the two training sessions
    d3.selectAll(".config_sv_meeting1")
        .text(config_info.sv_meeting1)
    d3.selectAll(".config_sv_meeting2")
        .text(config_info.sv_meeting2)
    
    // ------------------
    // updating selection.html
    // vis week
    d3.selectAll(".config_vis_week")
    .text(config_info.vis_week)


    // ------------------
    // updating shirtcontest.html
    d3.selectAll(".config_t_shirt_link") // the link to the larger picture
    .attr("link:href", config_info.t_shirt_link)

    d3.selectAll(".config_t_shirt_small_link") // the picture of the smaller picture
    .attr("src", config_info.t_shirt_small_link)

    d3.selectAll(".config_t_shirt_due") // the picture of the smaller picture
    .text(config_info.t_shirt_due)

    d3.selectAll(".config_t_shirt_subject") // the title/subject of the email sent to chairs
    .text(config_info.t_shirt_subject)
})

// --------------------------------------------------------------------------------
// end of config
// --------------------------------------------------------------------------------

// functions starts from here
function getThisPath() {
    var path = window.location.pathname;
    if (path === "/")
        path = "/index";
    return path;
}

function createPullRequestURL() {
    return repoPath + "edit/master" + getThisPath() + ".md";
}

function createFileBugURL() {
    var title = "Fix content problem on " + getThisPath() + ".md";
    return repoPath + "issues/new/?title=" + encodeURIComponent(title);
}

function runMainScript() {
    d3.select("#file-bug-anchor").attr("href", createFileBugURL());
    d3.select("#pull-request-anchor").attr("href", createPullRequestURL());
}
