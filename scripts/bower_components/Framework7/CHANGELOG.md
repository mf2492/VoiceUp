# Change Log

## Framework7 v0.8.0 - Updated on May 2, 2014

  * Sortable lists
  * Disable caching for specific pages with "nocache" parameter in URL
  * New "swipePanelActiveArea" parameter to allow swipe panels on specific distance from side of screen
  * Totally reworked internal FastClicks library
  * "device" object moved to Framework7.prototype for easy access before app intialization
  * New DOM7 methods - .insertAfter()
  * Fixed/improved DOM7 methods - .data(), .html(), .css()
  * Better animation sync for dynamic navbar and pages
  * New "viewClass", "viewMainClass", "viewsClass" parameters allow to have custom classes on Views

## Framework7 v0.7.8 - Updated on April 27, 2014

  * pushState, FastClicks improvements
  * Allow modal without title
  * New .data() DOM7 method
  * Fix styles for popup with statusbar overlay

## Framework7 v0.7.7 - Updated on April 24, 2014

  * pushState navigation
  * line-height fix for textarea

## Framework7 v0.7.6 - Updated on April 19, 2014

  * Lot of new shortcut methods for DOM7 library: click(), blur(), focus(), focusin(), focusout(), keyup(), keydown(), keypress(), submit(), change(), mousedown(), mousemove(), mouseup(), mouseenter(), mouseleave(), mouseout(), mouseover(), touchstart(), touchend(), touchmove(), resize(), scroll()
  * New .eq() DOM7 method
  * fixed navbar/toolbar vertical alignment

## Framework7 v0.7.5 - Updated on April 18, 2014

  * Swipe panels
  * Forms Storage
  * Preprocess Ajax content with "preprocess" callback parameter
  * Cross-browser checkbox switch
  * Fixes for navbar resizing

## Framework7 v0.7.4 - Updated on April 12, 2014

  * Smart selects
  * Smarter Ajax parser to parse files with different few pages in different views
  * Removed deprecated onPageInit/onPageBeforeInit callbacks from app and view
  * Refactored pages.js structure to bring mutual methods
  * Animated navbar’s left back icon when ".left" is ".sliding"
  * Fixed and improvements

## Framework7 v0.7.2 - Updated on April 11, 2014
  
  * improved dist/ app
  * small improvements and fixes in form elements

## Framework7 v0.7.1 - Updated on April 10, 2014

  * "show" event on active tab
  * fix for status bar detection
  * check for proper params in addView
  * size navbar on tab "show"

## Framework7 v0.7.0 - Updated on April 9, 2014
  
  * new fast clicks library
  * .tap() method removed and deprecated!
  * domCache to keep prev pages in view
  * dynamically generated popup and popover
  * improved device object
  * selectors engine available via Framework7.$
  