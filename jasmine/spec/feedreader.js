/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has non empty feed urls', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has non empty feed names', function(){
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });


    /* Test suite for testing the menu */
        describe("The menu", function(){

        
        /* This is a test that ensures the menu element is
         * hidden by default. 
         */
         it("is hidden by default", function(){
            let body =document.getElementsByTagName('body')[0];
            expect(body).toHaveClass("menu-hidden");
         });
         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * tests two expectations: the menu displays when
          * clicked and it is hidden when clicked again.
          */
          it("toggles display when clicked", function(){
            let body =document.getElementsByTagName('body')[0];
            let menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect(body).not.toHaveClass("menu-hidden");
            menuIcon.click();
            expect(body).toHaveClass("menu-hidden");
          });
        });
    /* A test suite to check initial entries" */
    describe("Initial Entries", function(){
        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Since loadFeed() is asynchronous, this test uses
         * Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });
        it("has atleast one entry after loadFeed runs", function(){
            let container = $('.feed');
            let feeds = container.find('.entry');
            expect(feeds.length).toBeGreaterThan(0);
        });
         });
    /* A test suite for testing new feed selection" */
    describe("New Feed Selection", function(){
        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var beforeContent,currentFeedText, feeds;
        var container = $('.feed');
        beforeEach(function(done){
            loadFeed(0, function(){
                feeds = container.find('.entry');
                beforeContent = feeds[0].innerText;
                loadFeed(1, function(){
                    feeds = container.find('.entry');
                    currentFeedText = feeds[0].innerText;
                    done();
                });
            });
        });
        afterEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        it("new feed changes content", function(done){
            expect(currentFeedText).not.toEqual(beforeContent);
            done();
        });
        
    });
}());
