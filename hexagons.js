var last_clicked = "";
// http://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element
function makeSVG(tag, attrs) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

// Converts a list of x,y pair "tuples" to strings so that it can be
// inserted as the paramter for the points attribute under the svg
// polygon
function points_to_string(point_list) {
    var str = "";
    for (var i = 0; i < point_list.length; ++i) {
        if (i != 0) {
            str += " ";
        }
        str += (Math.round(point_list[i][0] * 100) / 100).toString();
        str += " ";
        str += (Math.round(point_list[i][1] * 100) / 100).toString();
    }
    return str;
}

// Returns a list of x,y pair "tuples" for the six vertices of a hexagon
// based on the given side length and x and y offset. Hexagons are 
// flat side down as opposed to point down.
function generate_hexpoints(side, offset_x, offset_y) {
    return [
        [side / 2 + offset_x, 0 + offset_y],
        [side / 2 + side + offset_x, 0 + offset_y],
        [2 * side + offset_x, Math.sqrt(3) / 2 * side + offset_y],
        [side / 2 + side + offset_x, Math.sqrt(3) * side + offset_y],
        [side / 2 + offset_x, Math.sqrt(3) * side + offset_y],
        [0 + offset_x, Math.sqrt(3) / 2 * side + offset_y]
    ];
}

function make_hex_element(points, hexnum) {
    return makeSVG('polygon', {class: "hex",
                               fill: "url(#image)",
                               //ondrop: "drop(event)",
                               //ondragover: "allowDrop(event)", 
                               points: points_to_string(points),
                               id: hexnum,
                              });
}

$(function() {
    // Populate grid
    const GRID_ROW = 3; // Produces GRID_ROW * 2 - 1 rows
    const GRID_COL = 7; // Use odd number for symmetry
    const SIDE = 50;
    var count = 0;
    for (var j = 0; j < GRID_ROW; ++j) {
        for (var i = 0; i < GRID_COL; ++i) {
            if (i % 2 == 0) {
                var points = generate_hexpoints(SIDE, 3 * SIDE * (i / 2), 0 + j * Math.sqrt(3) * SIDE);
            } else {
                var points = generate_hexpoints(SIDE, 3 * SIDE * (i / 2), Math.sqrt(3) / 2 * SIDE + j * Math.sqrt(3) * SIDE);
            }
            $("svg").append(make_hex_element(points, count));
            count++;
        }
        if (j == GRID_ROW - 1) { // Add last row for symmetry
            for (var i = 0; i < GRID_COL; ++i) {
                if (i % 2 == 0) {
                    var points = generate_hexpoints(SIDE, 3 * SIDE * (i / 2), 0 + (j + 1) * Math.sqrt(3) * SIDE);
                    $("svg").append(make_hex_element(points, count));
                    count++;
                }
            }
        }
    }
    
    // Make color selection dropdown visible on hexagon click
    $(".hex").click( function(event) {
        event.stopPropagation();
        $("#color").css("visibility", "visible");
        last_clicked = $(this).attr("id");
    });
    /* TODO FIX
    // Make sure dropdown doesn't disappear when interacting with dropdown
    $(".panel").click( function(event) {
        event.stopPropagation();
    });
    // and invisible on click elsewhere
    $(document).on('click', function() {
        $("#color").css("visibility", "hidden");
    });
     */

    // Change hex color upon dropdown selection
    $(".dropdown-color-option").click( function(event) {
        $("#" + last_clicked).css("fill", $(this).attr("data-hex-color"));
        event.preventDefault();
    });
});