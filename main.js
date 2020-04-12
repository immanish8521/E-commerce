function fn() {
    window.scrollTo(0, 0);
}

function fn1() {
    window.scrollTo(0, 700);
}
function fnlast() {
    window.scrollTo(0, 2000);
}
function menbtn() {
    window.scrollTo(0, 600);
}
function womenbtn() {
    window.scrollTo(0, 1000);
}
function accbtn() {
    window.scrollTo(0, 1400);
}




// adding-to-cart-start
// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function (event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

// Clear items
$('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr>"
            + "<td>" + cartArray[i].name + "</td>"
            + "<td>(" + cartArray[i].price + ")</td>"
            + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
            + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
            + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
            + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
            + " = "
            + "<td>" + cartArray[i].total + "</td>"
            + "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();

// adding-to-cart-end

// ===== Scroll to Top ==== 
$(window).scroll(function () {
    if ($(this).scrollTop() >= 450) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(500);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(500);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function () {      // When arrow is clicked
    $('body,html').animate({
        scrollTop: 0                       // Scroll to top of body
    }, 500);
});


// transition
jQuery(document).ready(function (event) {
    var isAnimating = false,
        newLocation = '';
    firstLoad = false;

    //trigger smooth transition from the actual page to the new one 
    $('main').on('click', '[data-type="page-transition"]', function (event) {
        event.preventDefault();
        //detect which page has been selected
        var newPage = $(this).attr('href');
        //if the page is not already being animated - trigger animation
        if (!isAnimating) changePage(newPage, true);
        firstLoad = true;
    });

    //detect the 'popstate' event - e.g. user clicking the back button
    $(window).on('popstate', function () {
        if (firstLoad) {
            /*
            Safari emits a popstate event on page load - check if firstLoad is true before animating
            if it's false - the page has just been loaded 
            */
            var newPageArray = location.pathname.split('/'),
                //this is the url of the page to be loaded 
                newPage = newPageArray[newPageArray.length - 1];

            if (!isAnimating && newLocation != newPage) changePage(newPage, false);
        }
        firstLoad = true;
    });

    function changePage(url, bool) {
        isAnimating = true;
        // trigger page animation
        $('body').addClass('page-is-changing');
        $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            loadNewContent(url, bool);
            newLocation = url;
            $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        });
        //if browser doesn't support CSS transitions
        if (!transitionsSupported()) {
            loadNewContent(url, bool);
            newLocation = url;
        }
    }

    function loadNewContent(url, bool) {
        url = ('' == url) ? 'index.html' : url;
        var newSection = 'cd-' + url.replace('.html', '');
        var section = $('<div class="cd-main-content ' + newSection + '"></div>');

        section.load(url + ' .cd-main-content > *', function (event) {
            // load new content and replace <main> content with the new one
            $('main').html(section);
            //if browser doesn't support CSS transitions - dont wait for the end of transitions
            var delay = (transitionsSupported()) ? 1200 : 0;
            setTimeout(function () {
                //wait for the end of the transition on the loading bar before revealing the new content
                (section.hasClass('cd-about')) ? $('body').addClass('cd-about') : $('body').removeClass('cd-about');
                $('body').removeClass('page-is-changing');
                $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                    isAnimating = false;
                    $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
                });

                if (!transitionsSupported()) isAnimating = false;
            }, delay);

            if (url != window.location && bool) {
                //add the new page to the window.history
                //if the new page was triggered by a 'popstate' event, don't add it
                window.history.pushState({ path: url }, '', url);
            }
        });
    }

    function transitionsSupported() {
        return $('html').hasClass('csstransitions');
    }
});