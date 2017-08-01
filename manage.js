$(function() {
    // Create params for chart.
    var chartParams = {
        options: {
            top: 12,
            left: 12,
            line: {
                size: 2,
                color: "#3388dd"
            },
            node: {
                width: 128,
                height: 128,
                maxWidth: 128,
                maxHeight: 128,
                template: "<div id=\"{id}\"><img class=\"node-image\" src=\"images/avatar/{imgAvatar}\" /></div>"
            }
        },
        event: {
            node: {
                onProcess: function(node, nodes) {
                    console.log("node.onProcess");
                },
                onClick: function() {
                    console.log("node.onClick");
                },
                onMouseMove: function() {
                    console.log("node.onMouseMove");
                },
                onMouseOver: function() {
                    console.log("node.onMouseOver");
                },
                onMouseOut: function() {
                    console.log("node.onMouseOut");
                }
            },
            onCreate: function() {
                console.log("onCreate");
            },
            onError: null,
            onFinish: function() {
                console.log("onFinish");
            }
        },
        nodes: pOrgNodes
    };
    
    // Create OrgChartV2.
    var pChart = new OrgChartV2(chartParams);
    
    // Init.
    pChart.render();
});