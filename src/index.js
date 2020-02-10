import $ from 'jQuery';
import 'bootstrap';
import domtoimage from 'dom-to-image-more';
import Pickr from '@simonwep/pickr';

// Check for local storage information
$(window).on('load', function() {
    var checkStorage = function(type) {
        if (localStorage.getItem(type)) {
            let value = localStorage.getItem(type);
            $('.' + type + '-image-con').removeClass('selected');
            $('.' + type + '-image-con').eq(value).addClass('selected');
        } else {
            $('.' + type + '-image-con').removeClass('selected');
            $('.' + type + '-image-con').eq(0).addClass('selected');
        }
    }

    var setColors = function(type) {
        $('#' + type + ' svg').each(function (index, element) {
            $(element).css('color', localStorage.getItem(type + '-color'));
        });

        $('.icon-' + type).css('color', localStorage.getItem(type + '-color'));
    }

    var setIcon = function(type) {
        $('.' + type + '-image-con').each(function(index, element) {
            if ($(element).hasClass('selected')) {
                $('#icon-' + type).removeClass();
                $('#icon-' + type).addClass('draggable icon-' + type + ' ' + $(element).children().attr('class'));
            }
        });
    }
    
    var updatePosition = function(type) {
        let x = localStorage.getItem(type + 'X');
        let y = localStorage.getItem(type + 'Y');

        if (x) {
            $('#icon-' + type).css('left', x);
        }

        if (y) {
            $('#icon-' + type).css('top', y);
        }
    }

    var updateSize = function(type) {
        let size = localStorage.getItem(type + '-size');

        if (size) {
            $('#icon-' + type).css('font-size', size);
        }
    }

    var layers = [
        "head",
        "body",
        "legs",
        "feet",
    ];

    $.each(layers, function (index, value) {
        checkStorage(value);
        setColors(value);
        setIcon(value);
        updatePosition(value);
        updateSize(value);
    });
});

$(document).ready(function () {

    // Create pickr instance
    const pickr = Pickr.create({
        el: '.color-picker',
        theme: 'nano',
    
        components: {
            preview: true,
            opacity: true,
            hue: true,
    
            interaction: {
                hex: true,
                input: true,
                clear: true,
                save: true
            }
        }
    });

    // update colours on pickr state change
    pickr.on('save', function (color) {
        var colorHex = color.toHEXA().toString();

        if (document.getElementById('backgroundCheck').checked) {
            localStorage.setItem('backgroundColor', colorHex);
            $('.avatar-con').css('background-color', colorHex);
        } else {
            $('.nav-link').each(function (index, element) {
                if ($(element).hasClass('active')) {
                    let type = $(element).attr('aria-controls');

                    localStorage.setItem(type + '-color', colorHex);
                    $('.icon-' + type).css('color', colorHex);

                    $('#' + type + ' svg').each(function (index, element) {
                        $(element).css('color', colorHex);
                    });

                    $('#icon-' + type).each(function (index, element) {
                        $(element).css('color', colorHex);
                    });
                }
            });
        }
    }).on('change', function (color) {
        var colorHex = color.toHEXA().toString();

        if (document.getElementById('backgroundCheck').checked) {
            localStorage.setItem('backgroundColor', colorHex);
            $('.avatar-con').css('background-color', colorHex);
        } else {
            $('.nav-link').each(function (index, element) {
                if ($(element).hasClass('active')) {
                    let type = $(element).attr('aria-controls');

                    localStorage.setItem(type + '-color', colorHex);
                    $('.icon-' + type).css('color', colorHex);

                    $('#' + type + ' svg').each(function (index, element) {
                        $(element).css('color', colorHex);
                    });

                    $('#icon-' + type).each(function (index, element) {
                        $(element).css('color', colorHex);
                    });
                }
            });
        }
    }).on('clear', function (color) {
        $('.avatar-con').css('background-color', 'transparent');
    });

    var changeSelected = function(element) {
        if (!element.hasClass('selected')) {
            element.siblings('.selected').removeClass('selected');
            element.addClass('selected');
        }
    }

    $('.head-image-con').on('click', function() {
        changeSelected($(this));
        $('#icon-head').attr('class', '');
        $('#icon-head').attr('class', 'draggable icon-head ' + $(this).children().attr('class'));
        localStorage.setItem('head', $(this).index());
    });

    $('.body-image-con').on('click', function() {
        changeSelected($(this));
        $('#icon-body').removeClass();
        $('#icon-body').addClass('draggable icon-head ' + $(this).children().attr('class'));
        localStorage.setItem('body', $(this).index());
    });

    $('.legs-image-con').on('click', function() {
        changeSelected($(this));
        $('#icon-legs').removeClass();
        $('#icon-legs').addClass('draggable icon-head ' + $(this).children().attr('class'));
        localStorage.setItem('legs', $(this).index());
    });

    $('.feet-image-con').on('click', function() {
        changeSelected($(this));
        $('#icon-feet').removeClass();
        $('#icon-feet').addClass('draggable icon-head ' + $(this).children().attr('class'));
        localStorage.setItem('feet', $(this).index());
    });

    $('.nav-link').on('click', function() {
        let sizeType = $('#size').data('type');
        let navType = $(this).data('type');
        let iconSize = $('#icon-' + navType).css('font-size');

        if (navType !== sizeType) {
            $('#size').data('type', navType);
            $('#size').val(iconSize.replace(/\D/g, ''));
        }
    });

    $('#size').on('input', function() {
        let type = $(this).data('type');

        $('#icon-' + type).css('font-size', $(this).val());
        localStorage.setItem(type + '-size', $(this).val() + 'px');
    });

    $('#capture').on('click', function() {

        domtoimage.toPng(document.getElementById('avatar-container'))
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            document.body.appendChild(img);
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    });
});
