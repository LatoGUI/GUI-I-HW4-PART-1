/*
    File: index.js
    GUI Assignment: HW4 Part 1 - jQuery Validation Plugin
    Platon Supranovich, UMass Lowell Computer Science, Platon_Supranovich@student.uml.edu
    Copyright (c) 2025 by Platon. All rights reserved. May be freely copied or
    excerpted for educational purposes with credit to the author.
    updated by PS on November 15, 2025 at 8:00 AM
*/

$(document).ready(function () {
    $("#resultTable").empty();

    // Custom method: end >= start
    $.validator.addMethod("greaterThanOrEqual", function (value, element, param) {
        const startVal = parseFloat($(param).val());
        const endVal = parseFloat(value);
        return this.optional(element) || (!isNaN(startVal) && !isNaN(endVal) && startVal <= endVal);
    }, "End value must be greater than or equal to the start value.");

    $("#tableForm").validate({
        rules: {
            startCol: { required: true, number: true, min: -50, max: 50 },
            endCol:   { required: true, number: true, min: -50, max: 50, greaterThanOrEqual: "#startCol" },
            startRow: { required: true, number: true, min: -50, max: 50 },
            endRow:   { required: true, number: true, min: -50, max: 50, greaterThanOrEqual: "#startRow" }
        },
        messages: {
            startCol: {
                required: "Please enter a Start Multiplier.",
                number: "Must be a valid number.",
                min: "Cannot be less than -50. Please enter a number from -50 to 50.",
                max: "Cannot be greater than 50. Please enter a number from -50 to 50."
            },
            endCol: {
                required: "Please enter an End Multiplier.",
                number: "Must be a valid number.",
                min: "Cannot be less than -50. Please enter a number from -50 to 50.",
                max: "Cannot be greater than 50. Please enter a number from -50 to 50."
            },
            startRow: {
                required: "Please enter a Start Multiplicand.",
                number: "Must be a valid number.",
                min: "Cannot be less than -50. Please enter a number from -50 to 50.",
                max: "Cannot be greater than 50. Please enter a number from -50 to 50."
            },
            endRow: {
                required: "Please enter an End Multiplicand.",
                number: "Must be a valid number.",
                min: "Cannot be less than -50. Please enter a number from -50 to 50.",
                max: "Cannot be greater than 50. Please enter a number from -50 to 50."
            }
        },
        errorElement: "div",
        errorClass: "error-message",
        highlight: function (element) {
            $(element).addClass("error-input");
        },
        unhighlight: function (element) {
            $(element).removeClass("error-input");
        },
        errorPlacement: function (error, element) {
            // Place error inside the .error-placeholder of the same input-group
            element.closest(".input-group").find(".error-placeholder").html(error);
        },
        submitHandler: function () {
            generateTable();
        }
    });

    function generateTable() {
        const startCol = parseInt($("#startCol").val());
        const endCol = parseInt($("#endCol").val());
        const startRow = parseInt($("#startRow").val());
        const endRow = parseInt($("#endRow").val());

        const $table = $("#resultTable").empty();

        // Header
        let header = "<thead><tr><th></th>";
        for (let j = startCol; j <= endCol; j++) header += `<th>${j}</th>`;
        header += "</tr></thead><tbody>";

        // Body
        for (let i = startRow; i <= endRow; i++) {
            header += `<tr><th>${i}</th>`;
            for (let j = startCol; j <= endCol; j++) {
                header += `<td>${i * j}</td>`;
            }
            header += "</tr>";
        }
        header += "</tbody>";

        $table.html(header);
    }
});
